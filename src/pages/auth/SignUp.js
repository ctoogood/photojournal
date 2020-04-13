import React, { useContext, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
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
}));

const SignUp = () => {
  const classes = useStyles();
  const history = useHistory();
  const { pathname } = useLocation();
  const appContext = useContext(AuthContext);
  const {
    isLoading,
    user,
    email,
    password,
    changeMode,
    handleEmail,
    handlePassword,
    handleSignUp,
  } = appContext;

  useEffect(() => {
    if (user) {
      history.push(`/profile/${user.userName}`);
    } else {
      return;
    }
  }, [user, history]);

  return (
    <CardContent>
      <h3>Sign Up</h3>
      <ValidatorForm onSubmit={handleSignUp}>
        <div>
          <FormControl className={classes.formControl} variant="outlined">
            <TextValidator
              className={classes.input}
              id="email-signup"
              autoFocus
              value={email}
              onChange={handleEmail}
              label="Email"
              type="email"
              validators={["required", "isEmail"]}
              errorMessages={["this field is required", "email is not valid"]}
            />
          </FormControl>
        </div>
        <div>
          <FormControl className={classes.formControl} variant="outlined">
            <TextValidator
              className={classes.input}
              id="password-signup"
              value={password}
              onChange={handlePassword}
              label="Password"
              type="password"
              validators={["required"]}
              errorMessages={["this field is required"]}
            />
          </FormControl>
        </div>
        <div className="auth__spaceAbove">
          {isLoading ? (
            <CircularProgress />
          ) : (
            <Button className={classes.button} color="secondary" type="submit">
              Sign Up
            </Button>
          )}
        </div>
      </ValidatorForm>
      {pathname === "/signup" ? null : (
        <section className="login__noaccount">
          <p>Already Registered?</p>
          <Button color="primary" type="button" onClick={changeMode}>
            Login
          </Button>
        </section>
      )}
    </CardContent>
  );
};

export default SignUp;
