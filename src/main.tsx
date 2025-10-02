// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";            // or your top-level router/layout
import "./index.css";               // includes Tailwind directives

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
