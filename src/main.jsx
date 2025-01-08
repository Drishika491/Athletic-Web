import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { getCookie } from "./service/config";
import run from "./service/hmac";

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
setInterval(() => {
    localStorage.removeItem('xauth'),
    getCookie('xauth')
}, 60000);
localStorage.removeItem('xauth')
// run()