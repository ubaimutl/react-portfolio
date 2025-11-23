import { useEffect, useRef } from "react";
import CoinsLayer from "../../components/CoinsLayer";
import "./style.css";

export default function AICryptoHero() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handleMove = (e) => {
      const r = el.getBoundingClientRect();
      const mx = (e.clientX - r.left) / r.width - 0.5;
      const my = (e.clientY - r.top) / r.height - 0.5;
      el.style.setProperty("--tx", `${mx * 40}px`);
      el.style.setProperty("--ty", `${my * 40}px`);
    };
    el.addEventListener("mousemove", handleMove);
    return () => el.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <section ref={ref} className="hero">
      <div className="hero__bg animated-gradient" />
      <div className="hero__spotlight" />

      {/* Big backboard text */}
      {/* <div className="hero__backboard">
        <h1>CRYPTO</h1>
      </div> */}

      {/* Floating coins */}
      {/* <CoinsLayer /> */}

      {/* Foreground content */}
      <div className="hero__content">
        {/* <div className="pill">
          <span className="dot" /> Live Strategy Preview
        </div> */}
        <h2 className="hero__title">
          <span className="gradient-text">AI-powered</span> crypto trading
          strategy
        </h2>
        <h3 className="hero__sub">
          XGBoost Model trained on dozens of indicators ranging from momentum to
          volatility make Long/Short signal decision making more intellignet
          rather relying on specific hard coded logic. In addition, Trendline
          and Breakout strategy sever as double confirmations together with AI
          prediction on multi-timeframe scale using analysis timeframe and entry
          timeframe, deciding best entrance on 1 minute interval and making
          trading decision to enter position with high speed.
          <ul>
            <br></br>
            <li>
              <>&#x2713;</> Learns from market structure instead of using
              one-size-fits-all rules
            </li>
            <br></br>
            <li>
              <>&#x2713;</> Dual confirmations (AI + trend/breakout) for
              higher-quality trades
            </li>
            <br></br>
            <li>
              <>&#x2713;</> Built-in trailing stops and risk controls to prevent
              large drawdowns
            </li>
          </ul>
        </h3>

        <div className="reveal group">
          <button className="btn">Contact for Details</button>
          <div className="reveal__panel">
            <div className="reveal__card">Message on Upwork</div>
          </div>
        </div>
      </div>
    </section>
  );
}
