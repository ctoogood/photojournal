import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

import {
  FormControl,
  CircularProgress,
  Button,
  IconButton,
} from "@material-ui/core";

import "./auth.scss";
import { AuthContext } from "../../context/auth";
import { ArrowBack } from "@material-ui/icons";

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
    marginTop: "1rem",
    marginBottom: "1rem",
    "&:hover": {
      color: "#4fa1c4",
    },
  },
  verify: {
    zIndex: "10",
  },
  icon: {
    position: "absolute",
    top: 0,
    left: 0,
  },
}));

const ForgotPass = () => {
  const classes = useStyles();
  const history = useHistory();
  const appContext = useContext(AuthContext);
  const {
    isLoading,
    user,
    email,
    code,
    password,
    codeSubmit,
    handleEmail,
    handleBackLogin,
    handlePassword,
    handleNewPassSubmit,
    handlePassReset,
    handleCode,
  } = appContext;

  useEffect(() => {
    if (user) {
      history.push(`/profile/${user.userName}`);
    } else {
      return;
    }
  }, [user, history]);

  return (
    <>
      <IconButton onClick={handleBackLogin} className={classes.icon}>
        <ArrowBack />
      </IconButton>
      <h3>Forgotten Password</h3>
      {!codeSubmit ? (
        <ValidatorForm onSubmit={handlePassReset}>
          <p>
            Enter your email address to receive a code to reset your password.
          </p>

          <div>
            <FormControl className={classes.formControl} variant="outlined">
              <TextValidator
                className={classes.input}
                id="email-input"
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
            {isLoading ? (
              <CircularProgress />
            ) : (
              <Button
                disabled={!email}
                className={classes.button}
                type="submit"
              >
                Send Reset Code
              </Button>
            )}
          </div>
        </ValidatorForm>
      ) : (
        <ValidatorForm onSubmit={handleNewPassSubmit}>
          <p>
            Check your emails, enter the reset code below and then enter a new
            password
          </p>
          <div>
            <FormControl className={classes.formControl} variant="outlined">
              <TextValidator
                className={classes.input}
                id="code-input"
                autoFocus
                value={code}
                onChange={handleCode}
                label="Code"
                type="text"
                validators={["required"]}
                errorMessages={["this field is required"]}
              />
            </FormControl>
          </div>
          <div>
            <FormControl className={classes.formControl} variant="outlined">
              <TextValidator
                className={classes.input}
                id="password-input"
                value={password}
                onChange={handlePassword}
                label="New Password"
                type="password"
                validators={["required", "minNumber:8"]}
                errorMessages={[
                  "this field is required",
                  "Must be at least 8 characters",
                ]}
              />
            </FormControl>
          </div>
          <div>
            {isLoading ? (
              <CircularProgress />
            ) : (
              <Button className={classes.button} type="submit">
                Submit
              </Button>
            )}
          </div>
        </ValidatorForm>
      )}
    </>
  );
};

export default ForgotPass;
