import CoinStats from "../../components/CoinStats";
import PnLMarplot from "../../components/PnLMarplot";
import AICryptoHero from "../../components/AICryptoHero";
import CoinsLayer from "../../components/CoinsLayer";
import "./style.css";

export const Entries = () => {
  return (
    <>
      {/* Global animated background for the whole page */}
      <div className="page-bg animated-gradient" />
      <div className="page-spotlight" />
      <CoinsLayer />
      <AICryptoHero />

      <main className="app-shell">
        {/* Split layout: 30% bar chart (PnLMarplot) | 70% candlestick (CoinStats) */}
        <section className="split-panels">
          <div className="panel panel--bar">
            <div className="panel__body panel__body--fill">
              <PnLMarplot
                symbols={[
                  "ADAUSDT",
                  "BTCUSDT",
                  "ETHUSDT",
                  "SOLUSDT",
                  "XRPUSDT",
                  "DOGEUSDT",
                  "PEPEUSDT",
                  "TRUMPUSDT",
                ]}
                exchange="binance"
                db="coin-stats"
                height={520}
              />
            </div>
          </div>

          <div className="panel panel--candle">
            <div className="panel__body panel__body--fill">
              <CoinStats
                initialSymbol="ETHUSDT"
                initialInterval="1h"
                height={550}
              />
            </div>
          </div>
        </section>
      </main>
    </>
  );
};
