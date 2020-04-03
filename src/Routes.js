import React from "react";
import { Route, Switch } from "react-router-dom";

import Hero from "./components/hero/Hero";
import NotFound from "./pages/NotFound";
import Login from "./pages/auth/Login";

const Routes = ({ appProps }) => {
  return (
    <Switch>
      <Route path="/" exact component={Hero} />
      <Route path="/login" exact component={Login} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default Routes;
