import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

import {
  CardContent,
  FormControl,
  CircularProgress,
  Button,
} from "@material-ui/core";

import "./auth.scss";
import { AuthContext } from "../../context/auth";
import ForgotPass from "./ForgotPass";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "50px",
  },
  formControl: {
    marginBottom: "1rem",
  },
  input: {
    fontSize: ".9rem",
    marginBottom: "1rem",
  },
  button: {
    backgroundColor: "#4fa1c4",
    color: "white",
    fontWeight: "normal",
    display: "block",
    "&:hover": {
      color: "#4fa1c4",
    },
  },
  verify: {
    zIndex: "10",
  },
  loading: {
    display: "block",
  },
}));

const Login = () => {
  const classes = useStyles();
  const history = useHistory();
  const appContext = useContext(AuthContext);
  const {
    isLoading,
    user,
    email,
    error,
    password,
    changeMode,
    forgotPass,
    handleLogin,
    handleEmail,
    handlePassword,
    handleForgotPass,
  } = appContext;

  useEffect(() => {
    if (user) {
      history.push(`profile/${user.username}`);
    } else {
      return;
    }
  });

  return (
    <CardContent>
      {!forgotPass ? (
        <>
          <h3>Login</h3>
          <ValidatorForm
            onSubmit={handleLogin}
            onError={(errors) => console.log(errors)}
          >
            <div>
              <FormControl className={classes.formControl} variant="outlined">
                <TextValidator
                  className={classes.input}
                  id="email-input"
                  autoFocus
                  variant="outlined"
                  value={email}
                  onChange={handleEmail}
                  label="Email"
                  type="email"
                  validators={["required", "isEmail"]}
                  errorMessages={[
                    "this field is required",
                    "email is not valid",
                  ]}
                />
              </FormControl>
            </div>
            <div>
              <FormControl className={classes.formControl} variant="outlined">
                <TextValidator
                  className={classes.input}
                  id="password-input"
                  variant="outlined"
                  value={password}
                  onChange={handlePassword}
                  label="Password"
                  type="password"
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                />
              </FormControl>
              {error ? <p className="login__error">{error}</p> : null}
            </div>
            <div>
              {isLoading ? (
                <CircularProgress className={classes.loading} />
              ) : (
                <Button
                  disabled={ValidatorForm.isFormValid}
                  className={classes.button}
                  type="submit"
                >
                  Login
                </Button>
              )}
              <Button
                style={{ marginTop: "1rem", marginBottom: "1rem" }}
                onClick={handleForgotPass}
              >
                Forgot Your Password?
              </Button>
            </div>
          </ValidatorForm>
          <section className="login__noaccount">
            <p>No Account?</p>
            <Button type="button" onClick={changeMode}>
              Sign Up
            </Button>
          </section>
        </>
      ) : (
        <ForgotPass />
      )}
    </CardContent>
  );
};

export default Login;
