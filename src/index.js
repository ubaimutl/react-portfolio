import React from 'react';
import ReactDOM from "react-dom/client";
import App from './app/App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById("root"));
if (
  typeof window !== "undefined" &&
  process.env.NODE_ENV === "development"
  // && /VIVID_ENABLED=true/.test(document.cookie)
) {
  import("vivid-studio").then((v) => v.run());
  import("vivid-studio/style.css");
}
root.render(
    <App />
);
