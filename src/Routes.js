import React from "react";
import { Route, Switch } from "react-router-dom";

import Hero from "./components/hero/Hero";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import PostList from "./components/posts/PostList";
import PostDetail from "./components/posts/PostDetail";
import AuthForm from "./pages/auth/Auth";
import AccountSettings from "./components/settings/Settings";

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={Hero} />
      <Route path="/login" exact component={AuthForm} />
      <Route path="/signup" exact component={AuthForm} />
      <Route path="/settings" exact component={AccountSettings} />
      <Route path="/profile/:userid" exact component={Profile} />
      <Route path="/profile/:userid/:collectionid" exact component={PostList} />
      <Route
        path="/profile/:userid/:collectionid/:postid"
        exact
        component={PostDetail}
      />
      <Route component={NotFound} />
    </Switch>
  );
};

export default Routes;
