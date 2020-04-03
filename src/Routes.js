import React from "react";
import { Route, Switch } from "react-router-dom";

import Hero from "./components/hero/Hero";
import NotFound from "./pages/NotFound";
import Login from "./pages/auth/Login";
import Profile from "./pages/Profile";
import PostList from "./components/posts/PostList";

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={Hero} />
      <Route path="/login" exact component={Login} />
      <Route path="/profile/:userid" exact component={Profile} />
      <Route path="/profile/:userid/:collectionid" component={PostList} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default Routes;
