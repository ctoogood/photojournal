import React from "react";
import { Route, Switch } from "react-router-dom";

import Hero from "./components/hero/Hero";
import NotFound from "./pages/NotFound";
import Login from "./pages/auth/Login";
import Profile from "./pages/Profile";

const Routes = ({ appProps }) => {
  return (
    <Switch>
      <Route path="/" exact component={Hero} />
      <Route path="/login" exact component={Login} />
      <Route path="/profile/:userid" component={Profile} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default Routes;
