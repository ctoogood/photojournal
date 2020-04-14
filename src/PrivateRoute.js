import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";
import { AuthContext } from "./context/auth";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const appContext = useContext(AuthContext);
  const { user, isLoading } = appContext;
  return (
    <Route
      {...rest}
      render={(props) =>
        isLoading ? (
          <CircularProgress />
        ) : !user ? (
          <Redirect to="/login" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PrivateRoute;
