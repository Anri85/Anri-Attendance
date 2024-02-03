import React from "react";
import ReactDom from "react-dom/client";

import App from "./App";

import "./assets/styles/index.css";
import "./assets/styles/tailwind.css";
import "./index.css";

const root = ReactDom.createRoot(document.getElementById("root"));

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
