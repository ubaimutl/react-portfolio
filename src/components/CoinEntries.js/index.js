import TradingViewWidget, { Themes } from "react-tradingview-widget";
import "./style.css";

export const CoinEntries = () => (
  <div className="main_tradingview">
    <TradingViewWidget
      symbol="NASDAQ:AAPL"
      theme={Themes.DARK}
      locale="en"
      autosize
    />
  </div>
);
