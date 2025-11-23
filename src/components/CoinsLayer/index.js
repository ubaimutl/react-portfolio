import { useEffect, useRef } from "react";
import "./style.css";

export default function CoinsLayer() {
  // Use direct logo SVG URLs from CryptoLogos as requested
  // NOTE: Some tokens may not exist on CryptoLogos (e.g., TRUMP). Provide an alternative URL if needed.
  const ASSET_LOGOS = [
    {
      key: "BTC",
      url: "/ticker_symbols/btc.svg",
      colors: ["#f7931a", "#fdae42", "#ffcc80"],
    },
    {
      key: "ETH",
      url: "/ticker_symbols/eth.svg",
      colors: ["#627eea", "#7f96ff", "#b3c2ff"],
    },
    {
      key: "ADA",
      url: "/ticker_symbols/ada.svg",
      colors: ["#2469f3", "#4e86ff", "#9fb8ff"],
    },
    {
      key: "XRP",
      url: "/ticker_symbols/xrp.svg",
      colors: ["#13a3a3", "#39c6c6", "#8de1e1"],
    },
    {
      key: "SOL",
      url: "/ticker_symbols/sol.svg",
      colors: ["#9945ff", "#19fb9b", "#78e3fd"],
    },
    {
      key: "PEPE",
      url: "/ticker_symbols/pepe.svg",
      colors: ["#2ecc71", "#48e07f", "#a7f3b8"],
    },
    {
      key: "DOGE",
      url: "/ticker_symbols/doge.svg",
      colors: ["#c2a633", "#d8bf63", "#f1e0a3"],
    },
    { key: "TRUMP", url: "", colors: ["#eab308", "#ef4444", "#3b82f6"] }, // add /ticker_symbols/trump.svg when ready
  ];

  const bubbles = Array.from({ length: 32 }).map((_, i) => {
    const left = Math.random() * 100;
    const delay = Math.random() * 10;
    const duration = 12 + Math.random() * 18;
    const size = 28 + Math.random() * 52; // bigger bubbles
    const rotate = Math.random() * 360;
    const asset = ASSET_LOGOS[i % ASSET_LOGOS.length];
    const gradId = `${asset.key}-grad-${i}`;
    const clipId = `${asset.key}-clip-${i}`;

    return (
      <svg
        key={i}
        viewBox="0 0 100 100"
        className="coin"
        style={{
          left: `${left}%`,
          width: `${size}px`,
          height: `${size}px`,
          animation: `floatUp ${duration}s linear ${delay}s infinite`,
        }}
      >
        <defs>
          <radialGradient id={gradId} cx="50%" cy="45%" r="60%">
            <stop offset="0%" stopColor={asset.colors[1]} stopOpacity="0.95" />
            <stop offset="70%" stopColor={asset.colors[0]} stopOpacity="0.85" />
            <stop
              offset="100%"
              stopColor={asset.colors[2]}
              stopOpacity="0.65"
            />
          </radialGradient>
          <clipPath id={clipId}>
            <circle cx="50" cy="50" r="40" />
          </clipPath>
        </defs>

        {/* Bubble base */}
        <circle cx="50" cy="50" r="46" fill={`url(#${gradId})`} />
        {/* Bubble ring */}
        <circle
          cx="50"
          cy="50"
          r="44"
          fill="none"
          stroke="#ffffff22"
          strokeWidth="3"
        />
        {/* Bubble gloss */}
        <ellipse cx="38" cy="34" rx="14" ry="9" fill="#ffffff33" />

        {/* External logo inside bubble (clipped to circle) */}
        {asset.url ? (
          <image
            href={asset.url}
            x="20"
            y="20"
            width="60"
            height="60"
            preserveAspectRatio="xMidYMid meet"
            clipPath={`url(#${clipId})`}
            opacity="0.9"
          />
        ) : (
          // Fallback mark for missing URL (e.g., TRUMP placeholder)
          <g>
            <circle cx="50" cy="50" r="22" fill="#00000044" />
            <text
              x="50"
              y="56"
              textAnchor="middle"
              fontFamily="ui-sans-serif, system-ui"
              fontSize="20"
              fill="#ffffffcc"
              fontWeight="800"
            >
              {asset.key}
            </text>
          </g>
        )}
      </svg>
    );
  });

  return <div className="coins-layer">{bubbles}</div>;
}
