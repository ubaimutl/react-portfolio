// server.js
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const admin = require("firebase-admin");
const { GoogleAuth } = require("google-auth-library");
const https = require("https");

const PORT = process.env.PORT || 4000;

// ---- Config ----
const KEY_PATH =
  process.env.FIREBASE_CREDENTIALS ||
  path.join(process.cwd(), "crypto2025-458118-dd69fc94c724.json");

// Use the Firestore database that actually contains your data:
const DB_ID = process.env.FIRESTORE_DB_ID || "coin-stats";

let serviceAccount, projectId, dbRef;

function initFirebase() {
  if (admin.apps.length) return;

  if (!fs.existsSync(KEY_PATH)) {
    console.error(`[Firestore] Credential JSON not found at: ${KEY_PATH}`);
    process.exit(1);
  }
  serviceAccount = JSON.parse(fs.readFileSync(KEY_PATH, "utf-8"));
  projectId = serviceAccount.project_id;

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId,
  });

  // Create Firestore and select the database **once**
  dbRef = admin.firestore();
  dbRef.settings({ databaseId: DB_ID });

  console.log("[Firestore] Initialized");
  console.log("  projectId:", projectId);
  console.log("  databaseId:", DB_ID);
}
initFirebase();

function getDb() {
  return dbRef; // already bound to DB_ID
}

// ---- helpers ----
const toSec = (v) => {
  if (v == null) return undefined;
  if (typeof v === "number") {
    // treat 13-digit as ms
    if (v > 2_000_000_000_000) return Math.floor(v / 1000);
    return v; // seconds
  }
  const s = String(v);
  if (/^\d{13}$/.test(s)) return Math.floor(Number(s) / 1000); // ms string
  if (/^\d{10}$/.test(s)) return Number(s); // sec string
  const d = new Date(v);
  return Number.isFinite(d.getTime())
    ? Math.floor(d.getTime() / 1000)
    : undefined;
};

const normalizeTrade = (t, exchange, symbol) => ({
  exchange: t.exchange || exchange,
  symbol: (t.symbol || symbol).toUpperCase(),
  position: (t.position || t.side || "").toString(),
  entry_timestamp_s: toSec(
    t.entry_timestamp ?? t.entry ?? t.open_time ?? t.timestamp
  ),
  close_timestamp_s: toSec(t.close_timestamp ?? t.exit ?? t.close_time),
  real_pnl: typeof t.real_pnl === "number" ? t.real_pnl : undefined,
  real_net_pnl: typeof t.real_net_pnl === "number" ? t.real_net_pnl : undefined,
  close_reason: t.close_reason,
});

function parseTradesFromDocData(data, exchange, symbol) {
  if (!data || typeof data !== "object") return [];
  const raw = Array.isArray(data)
    ? data
    : Array.isArray(data.trades)
    ? data.trades
    : Array.isArray(data.positions)
    ? data.positions
    : Object.values(data).every((v) => v && typeof v === "object")
    ? Object.values(data)
    : [];

  const lines = Array.isArray(data.lines) ? data.lines : [];

  const a = raw
    .map((t) => normalizeTrade(t, exchange, symbol))
    .filter((t) => t.entry_timestamp_s && t.close_timestamp_s && t.position);

  const b = lines
    .map((line) => {
      const parts = String(line).split("|");
      if (parts.length < 5) return null;
      const [ex, sym, pos, entrySec, exitSec] = parts;
      return normalizeTrade(
        {
          exchange: ex,
          symbol: sym,
          position: pos,
          entry_timestamp: Number(entrySec),
          close_timestamp: Number(exitSec),
        },
        exchange,
        symbol
      );
    })
    .filter(Boolean);

  return [...a, ...b];
}

// Parse a trade from a Firestore **document** (data + possibly ID)
function parseTradeFromDocSnap(docSnap, exchange, symbol) {
  const data = docSnap.data() || {};
  const fromData = normalizeTrade(data, exchange, symbol);
  const completeFromData =
    fromData.position &&
    fromData.entry_timestamp_s &&
    fromData.close_timestamp_s
      ? fromData
      : null;

  // Also try parsing from ID if it looks like "binance|XRPUSDT|Long|1754548860|1754549760"
  const id = docSnap.id || "";
  let fromId = null;
  if (id.includes("|")) {
    const parts = id.split("|");
    if (parts.length >= 5) {
      const [ex, sym, pos, entry, exit] = parts;
      const entry_s = toSec(entry);
      const exit_s = toSec(exit);
      if (entry_s && exit_s && pos) {
        fromId = {
          exchange: ex || exchange,
          symbol: (sym || symbol).toUpperCase(),
          position: pos.toString(),
          entry_timestamp_s: entry_s,
          close_timestamp_s: exit_s,
        };
      }
    }
  }

  // Prefer complete data; otherwise fallback to ID-based if valid
  return completeFromData || fromId;
}

const app = express();
app.use(cors());
app.use((req, _res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// ===== Inspector 1: list databases =====
app.get("/api/_firestore/databases", async (_req, res) => {
  try {
    const auth = new GoogleAuth({
      credentials: serviceAccount,
      scopes: ["https://www.googleapis.com/auth/datastore"],
    });
    const client = await auth.getClient();
    const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases`;
    const token = await client.getAccessToken();

    https
      .get(
        url,
        { headers: { Authorization: `Bearer ${token.token}` } },
        (r) => {
          let body = "";
          r.on("data", (d) => (body += d));
          r.on("end", () => {
            try {
              const json = JSON.parse(body);
              res.status(200).json({
                projectId,
                currentDatabaseId: DB_ID,
                databases:
                  json.databases?.map((d) => ({
                    name: d.name,
                    databaseId: d.name.split("/").pop(),
                    locationId: d.locationId,
                    type: d.type,
                    concurrencyMode: d.concurrencyMode,
                  })) || [],
              });
            } catch (e) {
              res.status(500).json({
                error: "Failed to parse databases response",
                raw: body,
              });
            }
          });
        }
      )
      .on("error", (e) => res.status(500).json({ error: e.message }));
  } catch (e) {
    res.status(500).json({ error: String(e?.message || e) });
  }
});

// ===== Inspector 2: list root collections & IDs =====
app.get("/api/_firestore/collections", async (_req, res) => {
  try {
    const db = getDb();
    const cols = await db.listCollections();
    const names = cols.map((c) => c.id);

    // for any root collection that matches "binance-*", list a few IDs
    const sample = {};
    for (const name of names) {
      if (name.startsWith("binance-")) {
        try {
          const docRefs = await db.collection(name).listDocuments();
          sample[name] = docRefs.slice(0, 50).map((r) => r.id);
        } catch (e) {
          sample[name] = [{ error: String(e?.message || e) }];
        }
      }
    }

    res.status(200).json({
      projectId,
      databaseId: DB_ID,
      rootCollections: names,
      samples: sample,
    });
  } catch (e) {
    res.status(500).json({ error: String(e?.message || e) });
  }
});

// ===== Main: get trades =====
app.get("/api/coin-stats", async (req, res) => {
  const exchange = (req.query.exchange || "binance").toString();
  const symbol = (req.query.symbol || "BTCUSDT").toString().toUpperCase();
  const db = getDb();

  // 1) OLD LAYOUT: collection("coin-stats").doc("<exchange>-<SYMBOL>")
  const docCandidates = [
    `${exchange}-${symbol}`,
    `${exchange}-${symbol.toLowerCase()}`,
    `${exchange}_${symbol}`,
    `${exchange}_${symbol.toLowerCase()}`,
  ];

  try {
    let trades = [];
    let usedPath = null;

    // Try old doc path first
    for (const docId of docCandidates) {
      const ref = db.collection("coin-stats").doc(docId);
      console.log(`[Firestore] try old path: coin-stats/${docId}`);
      try {
        const snap = await ref.get();
        if (snap.exists) {
          const data = snap.data() || {};
          trades = parseTradesFromDocData(data, exchange, symbol);
          usedPath = `coin-stats/${docId}`;
          console.log(`[Firestore] FOUND old path; trades=${trades.length}`);
          break;
        }
      } catch (e) {
        // ignore, fall through to new layout
      }
    }

    // 2) NEW LAYOUT: a **root collection** named "<exchange>-<SYMBOL>"
    if (!trades.length) {
      const collName = `${exchange}-${symbol}`;
      console.log(`[Firestore] try new layout: collection ${collName}`);
      try {
        const qs = await db.collection(collName).limit(1000).get(); // batch read (adjust limit if you need more)
        if (!qs.empty) {
          for (const doc of qs.docs) {
            const t = parseTradeFromDocSnap(doc, exchange, symbol);
            if (t && t.entry_timestamp_s && t.close_timestamp_s && t.position) {
              trades.push(t);
            }
          }
          usedPath = `${collName}/* (docs)`;
          console.log(
            `[Firestore] NEW layout hit; docs=${qs.size} parsedTrades=${trades.length}`
          );
        } else {
          console.log(
            `[Firestore] NEW layout: collection ${collName} is empty`
          );
        }
      } catch (e) {
        console.warn(
          `[Firestore] Error reading collection ${collName}:`,
          e?.message || e
        );
      }
    }

    // If still nothing, show available root collections so you can confirm the path
    if (!trades.length) {
      const cols = await db.listCollections();
      const names = cols.map((c) => c.id);
      return res.status(200).json({
        symbol,
        exchange,
        trades: [],
        debug: {
          projectId,
          databaseId: DB_ID,
          attempted: {
            oldDocPaths: docCandidates.map((id) => `coin-stats/${id}`),
            newCollection: `${exchange}-${symbol}`,
          },
          rootCollections: names,
          note: "Your DB lists symbol-named root collections. Ensure the target collection contains docs with fields or IDs carrying entry/exit times.",
        },
      });
    }

    // Sort trades by entry time just in case
    trades.sort(
      (a, b) => (a.entry_timestamp_s || 0) - (b.entry_timestamp_s || 0)
    );

    return res.status(200).json({
      symbol,
      exchange,
      trades,
      debug: { projectId, databaseId: DB_ID, usedPath },
    });
  } catch (err) {
    console.error("[Firestore] Fatal error:", err?.message || err, err);
    return res.status(500).json({ error: String(err?.message || err) });
  }
});

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
