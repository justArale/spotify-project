import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { CollectWrapper } from "./context/collectData.context";
import { AuthWrapper } from "./context/auth.context";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <AuthWrapper>
        <CollectWrapper>
          <App />
        </CollectWrapper>
      </AuthWrapper>
    </Router>
  </React.StrictMode>
);
