import React from "react";
import { createRoot } from "react-dom/client";
import App from "./CloudCommerceSite.jsx";

if (!window.location.hash) window.location.hash = "#/";
createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
