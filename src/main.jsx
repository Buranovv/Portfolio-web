import React from "react";
import ReactDOM from "react-dom/client";
import StoreProvider from "./redux/store/index.jsx";
import App from "./App.jsx";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StoreProvider>
      <App />
    </StoreProvider>
  </React.StrictMode>
);
