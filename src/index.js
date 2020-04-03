import React from "react";
import Amplify from "aws-amplify";
import awsExports from "./aws-exports";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./context/auth";
import * as serviceWorker from "./serviceWorker";

Amplify.configure(awsExports);

ReactDOM.render(
  <AuthProvider>
    <Router>
      <App />
    </Router>
  </AuthProvider>,
  document.getElementById("root")
);

serviceWorker.unregister();
