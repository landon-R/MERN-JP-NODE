import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App";
import { CRMContext, CRMProvider } from "./context/CRMContext";

ReactDOM.render(
  <React.Fragment>
    <CRMProvider>
      <App />
    </CRMProvider>
  </React.Fragment>,
  document.getElementById("root")
);
