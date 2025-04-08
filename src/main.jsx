import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/index.css";

// React 18 rendering method
const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
