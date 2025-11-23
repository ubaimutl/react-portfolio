// src/components/CoinStats/index.js
import React, { useEffect, useMemo, useRef, useState } from "react";
import { createChart } from "lightweight-charts";

/**
 * Candlestick chart with Binance klines + Firestore trade markers (via /api/coin-stats).
 * Long: entry green (below), exit red (above)
 * Short: entry red (above), exit green (below)
 */

const DEFAULT_COLORS = {
  backgroundColor: "#0b1220",
  gridColor: "#1f2a44",
  textColor: "#cbd5e1",
  upColor: "#22c55e",
  downColor: "#ef4444",
  wickUpColor: "#22c55e",
  wickDownColor: "#ef4444",
  borderUpColor: "#22c55e",
  borderDownColor: "#ef4444",
};

function mapBinanceKline(k) {
  return {
    time: Math.floor(k[0] / 1000),
    open: parseFloat(k[1]),
    high: parseFloat(k[2]),
    low: parseFloat(k[3]),
    close: parseFloat(k[4]),
  };
}

export default function CoinStats({
  initialSymbol = "BTCUSDT",
  initialInterval = "1h",
  height = 520,
  colors = {},
}) {
  const cfg = useMemo(() => ({ ...DEFAULT_COLORS, ...colors }), [colors]);

  const [symbol, setSymbol] = useState(initialSymbol.toUpperCase());
  const [interval, setIntervalStr] = useState(initialInterval);

  const [legend, setLegend] = useState({ close: "-", trades: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const containerRef = useRef(null);
  const chartRef = useRef(null);
  const candleSeriesRef = useRef(null);

  const adjustSize = () => {
    const el = containerRef.current;
    const chart = chartRef.current;
    if (!el || !chart) return;
    const rect = el.getBoundingClientRect();
    chart.applyOptions({ width: Math.floor(rect.width), height });
  };

  // Create chart (use addCandlestickSeries only; no constructor API)
  useEffect(() => {
    if (!containerRef.current) return;
    const chart = createChart(containerRef.current, {
      layout: {
        background: { color: cfg.backgroundColor },
        textColor: cfg.textColor,
      },
      width: containerRef.current.clientWidth,
      height,
      localization: {
        priceFormatter: (v) => (v >= 1000 ? v.toLocaleString() : v.toString()),
      },
      rightPriceScale: {
        scaleMargins: { top: 0.1, bottom: 0.1 },
        borderVisible: true,
      },
      timeScale: {
        rightOffset: 12,
        barSpacing: 10,
        minBarSpacing: 3,
        borderVisible: true,
      },
      grid: {
        vertLines: { visible: true, color: cfg.gridColor },
        horzLines: { visible: true, color: cfg.gridColor },
      },
      crosshair: { mode: 0 },
      handleScroll: true,
      handleScale: true,
    });

    chartRef.current = chart;

    if (typeof chart.addCandlestickSeries !== "function") {
      console.error(
        "lightweight-charts build does not have addCandlestickSeries. Check version/duplicates."
      );
    }

    const candle = chart.addCandlestickSeries({
      upColor: cfg.upColor,
      downColor: cfg.downColor,
      borderUpColor: cfg.borderUpColor,
      borderDownColor: cfg.borderDownColor,
      wickUpColor: cfg.wickUpColor,
      wickDownColor: cfg.wickDownColor,
    });
    candleSeriesRef.current = candle;

    const handleResize = () =>
      chart.applyOptions({
        width: Math.floor(containerRef.current.clientWidth),
      });
    window.addEventListener("resize", handleResize);
    const ro = new ResizeObserver(() => adjustSize());
    ro.observe(containerRef.current);

    return () => {
      window.removeEventListener("resize", handleResize);
      try {
        ro.disconnect();
      } catch {}
      chart.remove();
      chartRef.current = null;
      candleSeriesRef.current = null;
    };
  }, [
    cfg.backgroundColor,
    cfg.textColor,
    cfg.gridColor,
    cfg.upColor,
    cfg.downColor,
    cfg.borderUpColor,
    cfg.borderDownColor,
    cfg.wickUpColor,
    cfg.wickDownColor,
    height,
  ]);

  // CRA-friendly API base (proxy in dev or explicit env var)
  const API_BASE = process.env.REACT_APP_API_BASE || ""; // keep empty if using CRA proxy

  // Load trades and set markers
  const loadTrades = async (sym) => {
    const s = (sym ?? symbol).toUpperCase().replace(/[^A-Z0-9]/g, "");
    try {
      const res = await fetch(
        `${API_BASE}/api/coin-stats?symbol=${encodeURIComponent(
          s
        )}&exchange=binance`
      );
      if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
      const { trades = [] } = await res.json();

      const markers = [];
      for (const t of trades) {
        const pos = (t.position || "").toLowerCase();
        const isLong = pos === "long";
        const entryColor = isLong ? "#16a34a" : "#ef4444";
        const exitColor = isLong ? "#ef4444" : "#16a34a";

        if (t.entry_timestamp_s) {
          markers.push({
            time: t.entry_timestamp_s,
            position: isLong ? "belowBar" : "aboveBar",
            color: entryColor,
            shape: isLong ? "arrowUp" : "arrowDown",
            text: `${isLong ? "Long" : "Short"} IN`,
          });
        }
        if (t.close_timestamp_s) {
          markers.push({
            time: t.close_timestamp_s,
            position: isLong ? "aboveBar" : "belowBar",
            color: exitColor,
            shape: isLong ? "arrowDown" : "arrowUp",
            text: `${isLong ? "Long" : "Short"} OUT${
              typeof t.real_net_pnl === "number"
                ? ` (${t.real_net_pnl.toFixed(4)})`
                : ""
            }`,
          });
        }
      }

      if (typeof candleSeriesRef.current?.setMarkers === "function") {
        candleSeriesRef.current.setMarkers(markers);
      } else {
        console.warn(
          "setMarkers not available — ensure lightweight-charts v4+ and no duplicates."
        );
      }

      setLegend((l) => ({
        ...l,
        trades: markers.length ? Math.floor(markers.length / 2) : 0,
      }));
    } catch (e) {
      console.error(e);
      if (typeof candleSeriesRef.current?.setMarkers === "function") {
        candleSeriesRef.current.setMarkers([]);
      }
      setLegend((l) => ({ ...l, trades: 0 }));
    }
  };

  // Fetch candles, then overlay markers
  const loadData = async (symArg, intArg) => {
    const sym = (symArg ?? symbol).toUpperCase().replace(/[^A-Z0-9]/g, "");
    const iv = intArg ?? interval;
    setLoading(true);
    setError("");

    const urls = [
      `https://api.binance.com/api/v3/klines?symbol=${sym}&interval=${iv}&limit=500`,
      `https://data-api.binance.vision/api/v3/klines?symbol=${sym}&interval=${iv}&limit=500`,
    ];

    let json = null;
    let lastErr = null;
    for (const url of urls) {
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
        const data = await res.json();
        if (Array.isArray(data) && data.length) {
          json = data;
          break;
        }
        throw new Error("No data returned.");
      } catch (e) {
        lastErr = e;
      }
    }

    try {
      if (!json) throw lastErr || new Error("Failed to load data");
      const candles = json.map(mapBinanceKline);
      if (!candleSeriesRef.current) return;
      candleSeriesRef.current.setData(candles);

      const last = candles[candles.length - 1]?.close;
      setLegend((l) => ({ ...l, close: last ? last.toFixed(2) : "-" }));

      chartRef.current?.timeScale().fitContent();

      await loadTrades(sym);

      requestAnimationFrame(() => {
        adjustSize();
        chartRef.current?.timeScale().fitContent();
      });
    } catch (e) {
      setError(e.message || "Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (chartRef.current) loadData(symbol, interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chartRef.current]);

  const onKeyDown = (e) => {
    if (e.key === "Enter") loadData(symbol, interval);
  };

  const css = `
  .cs-wrapper{background:#0b1220;color:#cbd5e1;border:1px solid #1e293b;border-radius:14px;overflow:hidden;font-family:Inter,ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial;}
  .cs-toolbar{display:flex;align-items:center;gap:10px;padding:10px 12px;border-bottom:1px solid #1e293b;background:linear-gradient(180deg,#111a2e,#0e1628);}
  .cs-label{font-size:12px;font-weight:600;opacity:.8}
  .cs-input,.cs-select{height:32px;border-radius:10px;border:1px solid #334155;background:#0b1220;color:#e2e8f0;padding:0 10px;font-size:12px;outline:none;}
  .cs-input::placeholder{color:#94a3b8}
  .cs-input:focus,.cs-select:focus{border-color:#38bdf8;box-shadow:0 0 0 3px rgba(56,189,248,.25)}
  .cs-input{width:140px}
  .cs-btn{height:32px;border-radius:10px;border:1px solid #334155;background:#111827;color:#e5e7eb;font-size:12px;padding:0 12px;cursor:pointer;transition:all .15s ease;box-shadow:0 1px 0 rgba(0,0,0,.35)}
  .cs-btn:hover{background:#1f2937;border-color:#38bdf8}
  .cs-btn:active{background:#374151}
  .cs-legend{margin-left:auto;display:flex;align-items:center;gap:14px;font-size:12px}
  .cs-legend .dim{opacity:.7}
  .cs-status{margin:8px 8px 0 8px;padding:6px 8px;border-radius:8px;font-size:12px;border:1px solid #334155;background:#0f172a}
  .cs-status.err{border-color:#7f1d1d;background:#170e10;color:#fecaca}
  .cs-chart{padding:8px}
`;

  return (
    <div className="cs-wrapper">
      <style>{css}</style>

      <div className="cs-toolbar">
        <div className="cs-label">Symbol</div>
        <input
          value={symbol}
          onChange={(e) => setSymbol(e.target.value.toUpperCase())}
          onKeyDown={onKeyDown}
          placeholder="e.g. BTCUSDT"
          className="cs-input"
        />

        <div className="cs-label" style={{ marginLeft: 6 }}>
          Interval
        </div>
        <select
          value={interval}
          onChange={(e) => setIntervalStr(e.target.value)}
          className="cs-select"
        >
          {["1m", "5m", "15m", "30m", "1h", "4h", "1d"].map((iv) => (
            <option key={iv} value={iv}>
              {iv}
            </option>
          ))}
        </select>

        <button
          type="button"
          className="cs-btn"
          onClick={() => loadData(symbol, interval)}
        >
          Apply
        </button>

        <div className="cs-legend">
          <div className="dim">
            {symbol.toUpperCase()} · {interval.toUpperCase()}
          </div>
          <div>
            Close: <strong>{legend.close}</strong>
          </div>
          <div className="dim">
            Trades: <strong>{legend.trades}</strong>
          </div>
        </div>
      </div>

      <div className="cs-chart">
        {loading && (
          <div className="cs-status">
            Loading {symbol} · {interval}...
          </div>
        )}
        {error && <div className="cs-status err">{error}</div>}
        <div ref={containerRef} style={{ width: "100%", height }} />
      </div>
    </div>
  );
}
