import React, { useEffect, useMemo, useRef, useState } from "react";

/**
 * PnLMarplot
 * ----------
 * - Fetches trades for multiple symbols from /api/coin-stats
 * - Filters by close_timestamp_s within a lookback window (1D, 7D, 30D, 1Y)
 * - Aggregates real_net_pnl per symbol
 * - Renders an SVG bar chart (no extra deps)
 *
 * Props:
 *   symbols?: string[]            // default: ["ADAUSDT","BTCUSDT","ETHUSDT","SOLUSDT","XRPUSDT"]
 *   exchange?: string             // default: "binance"
 *   db?: string                   // Firestore DB id if you are using `?db=` on server (default omitted)
 *   height?: number               // chart height (default 320)
 *   barWidth?: number             // width of each bar in px (default 42)
 *   gap?: number                  // gap between bars (default 18)
 *   palette?: {pos:string,neg:string,bg:string,grid:string,text:string,linePos:string,lineNeg:string}
 *
 * Usage:
 *   <PnLMarplot symbols={["BTCUSDT","ETHUSDT","XRPUSDT"]} />
 */

const DEFAULT_SYMBOLS = [
  "ADAUSDT",
  "BTCUSDT",
  "ETHUSDT",
  "SOLUSDT",
  "XRPUSDT",
  "DOGEUSDT",
  "PEPEUSDT",
  "TRUMPUSDT",
];

const DEFAULT_COLORS = {
  bg: "#0b1220",
  grid: "#1f2a44",
  text: "#cbd5e1",
  pos: "#22c55e",
  neg: "#ef4444",
  linePos: "#22c55e",
  lineNeg: "#ef4444",
};

const LOOKBACKS = [
  { key: "1d", label: "1D", seconds: 1 * 24 * 60 * 60 },
  { key: "7d", label: "7D", seconds: 7 * 24 * 60 * 60 },
  { key: "30d", label: "30D", seconds: 30 * 24 * 60 * 60 },
  { key: "1y", label: "1Y", seconds: 365 * 24 * 60 * 60 },
];

export default function PnLMarplot({
  symbols = DEFAULT_SYMBOLS,
  exchange = "binance",
  db, // optional: if you exposed ?db= on the server
  height = 320,
  barWidth = 42,
  gap = 10,
  palette = {},
}) {
  const colors = useMemo(() => ({ ...DEFAULT_COLORS, ...palette }), [palette]);
  const [rangeKey, setRangeKey] = useState("7d");
  const [data, setData] = useState([]); // [{symbol, pnl}]
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const API_BASE = process.env.REACT_APP_API_BASE || ""; // CRA proxy-friendly

  // Fetch & aggregate whenever symbols/range change
  useEffect(() => {
    let isCancelled = false;

    const fetchAll = async () => {
      setLoading(true);
      setErr("");

      const nowSec = Math.floor(Date.now() / 1000);
      const lookback =
        LOOKBACKS.find((l) => l.key === rangeKey) || LOOKBACKS[1];
      const fromSec = nowSec - lookback.seconds;

      try {
        const results = await Promise.all(
          symbols.map(async (sym) => {
            const qs = new URLSearchParams({
              exchange,
              symbol: sym,
            });
            if (db) qs.set("db", db);

            const res = await fetch(
              `${API_BASE}/api/coin-stats?${qs.toString()}`
            );
            if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
            const json = await res.json();

            const trades = Array.isArray(json.trades) ? json.trades : [];
            // Filter by close time within lookback window
            const filtered = trades.filter((t) => {
              const ct = Number(t.close_timestamp_s);
              return Number.isFinite(ct) && ct >= fromSec && ct <= nowSec;
            });

            // Sum real_net_pnl
            const pnl = filtered.reduce(
              (acc, t) =>
                acc + (typeof t.real_net_pnl === "number" ? t.real_net_pnl : 0),
              0
            );
            return { symbol: sym, pnl };
          })
        );

        if (!isCancelled) setData(results);
      } catch (e) {
        if (!isCancelled) setErr(e.message || "Failed to load");
      } finally {
        if (!isCancelled) setLoading(false);
      }
    };

    fetchAll();
    return () => {
      isCancelled = true;
    };
  }, [symbols.join(","), exchange, db, rangeKey]); // eslint-disable-line react-hooks/exhaustive-deps

  // Chart geometry
  const width = useMemo(() => {
    const n = Math.max(1, symbols.length);
    // total width = bars*barWidth + gaps*(n+1) + left/right padding (we'll use gap for side padding)
    return n * barWidth + (n + 1) * gap;
  }, [symbols.length, barWidth, gap]);

  const { maxAbs, total } = useMemo(() => {
    const vals = data.map((d) => Math.abs(d.pnl));
    const m = Math.max(0.00001, ...vals);
    const sum = data.reduce((acc, d) => acc + d.pnl, 0);
    return { maxAbs: m, total: sum };
  }, [data]);

  const yScale = (val, h, padTop = 16, padBottom = 28) => {
    // map value -> y in SVG (0 is top)
    const innerH = h - padTop - padBottom;
    const zeroY = padTop + innerH / 2; // put zero in the middle
    if (maxAbs === 0) return zeroY;
    const pxPerUnit = innerH / (2 * maxAbs);
    return zeroY - val * pxPerUnit;
  };

  const zeroY = yScale(0, height);
  const overallPositive = total >= 0;

  const css = `
  .pnl-wrap{background:${colors.bg};color:${colors.text};border:1px solid #1e293b;border-radius:14px;overflow:hidden;font-family:Inter,ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial;}
  .pnl-toolbar{display:flex;align-items:center;gap:8px;padding:10px 12px;border-bottom:1px solid #1e293b;background:linear-gradient(180deg,#111a2e,#0e1628);}
  .pnl-title{font-weight:700;font-size:14px;opacity:.9;margin-right:10px;}
  .pnl-btn{height:28px;border-radius:9999px;border:1px solid #334155;background:#0b1220;color:${colors.text};font-size:12px;padding:0 10px;cursor:pointer}
  .pnl-btn.active{border-color:#38bdf8;box-shadow:0 0 0 3px rgba(56,189,248,.2)}
  .pnl-status{margin-left:auto;font-size:12px;opacity:.8}
  .pnl-body{padding:10px}
  .pnl-legend{display:flex;align-items:center;gap:10px;margin-top:6px}
  .pill{border-radius:9999px;padding:2px 10px;font-size:12px;border:1px solid #334155;background:#0f172a}
  .pill.pos{color:#16a34a;border-color:#14532d;background:rgba(34,197,94,.1)}
  .pill.neg{color:#ef4444;border-color:#7f1d1d;background:rgba(239,68,68,.1)}
  .axisLabel{font-size:11px;fill:${colors.text};opacity:.8}
  `;

  return (
    <div className="pnl-wrap">
      <style>{css}</style>

      <div className="pnl-toolbar">
        <div className="pnl-title">P&L by Symbol</div>
        {LOOKBACKS.map((lb) => (
          <button
            key={lb.key}
            className={`pnl-btn ${rangeKey === lb.key ? "active" : ""}`}
            onClick={() => setRangeKey(lb.key)}
            type="button"
          >
            {lb.label}
          </button>
        ))}
        <div className="pnl-status">
          {loading ? (
            "Loading…"
          ) : err ? (
            <span style={{ color: "#fca5a5" }}>{err}</span>
          ) : null}
        </div>
      </div>

      <div className="pnl-body">
        <svg
          width={width}
          height={height}
          role="img"
          aria-label="P&L bar chart"
        >
          {/* background */}
          <rect x="0" y="0" width={width} height={height} fill={colors.bg} />

          {/* zero line (colored by overall total) */}
          <line
            x1={0}
            x2={width}
            y1={zeroY}
            y2={zeroY}
            stroke={overallPositive ? colors.linePos : colors.lineNeg}
            strokeWidth="2"
            opacity="0.85"
          />

          {/* bars */}
          {data.map((d, idx) => {
            const x = gap + idx * (barWidth + gap);
            const yVal = yScale(d.pnl, height);
            const isPos = d.pnl >= 0;
            const fill = isPos ? colors.pos : colors.neg;

            // bar: from zeroY to yVal
            const barY = Math.min(zeroY, yVal);
            const barH = Math.max(2, Math.abs(zeroY - yVal)); // ensure tiny visible bar

            return (
              <g key={d.symbol}>
                <rect
                  x={x}
                  y={barY}
                  width={barWidth}
                  height={barH}
                  fill={fill}
                  opacity="0.9"
                  rx="6"
                />
                {/* symbol label */}
                <text
                  x={x + barWidth / 2}
                  y={height - 6}
                  textAnchor="middle"
                  className="axisLabel"
                >
                  {d.symbol.replace(/USDT$/i, "")}
                </text>
                {/* value label (above pos, below neg) */}
                <text
                  x={x + barWidth / 2}
                  y={isPos ? barY - 6 : barY + barH + 12}
                  textAnchor="middle"
                  className="axisLabel"
                >
                  {d.pnl.toFixed(4)}
                </text>
              </g>
            );
          })}
        </svg>

        <div className="pnl-legend">
          <span className={`pill ${overallPositive ? "pos" : "neg"}`}>
            Total: {total >= 0 ? "+" : ""}
            {total.toFixed(4)}
          </span>
          <span className="pill">
            Range: {LOOKBACKS.find((l) => l.key === rangeKey)?.label}
          </span>
          <span className="pill">Exchange: {exchange}</span>
        </div>
      </div>
    </div>
  );
}
