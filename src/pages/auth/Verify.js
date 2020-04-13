import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

import {
  CardContent,
  FormControl,
  CircularProgress,
  Button,
  Card,
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

const Verify = () => {
  const classes = useStyles();
  const history = useHistory();
  const appContext = useContext(AuthContext);
  const { isLoading, user, code, handleCode, handleConfirmSignUp } = appContext;

  useEffect(() => {
    if (user) {
      history.push(`/profile/${user.userName}`);
    } else {
      return;
    }
  }, [user, history]);
  return (
    <Card className={classes.verify}>
      <CardContent>
        <h3>Enter Verification Code</h3>
        <ValidatorForm onSubmit={handleConfirmSignUp}>
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
            {isLoading ? (
              <CircularProgress />
            ) : (
              <Button
                className={classes.button}
                color="secondary"
                type="submit"
              >
                Submit
              </Button>
            )}
          </div>
        </ValidatorForm>
        <section className="login__noaccount">
          <p>Didn't receive a code?</p>
          <Button className={classes.button} color="primary" type="button">
            Resend Code
          </Button>
        </section>
      </CardContent>
    </Card>
  );
};

export default Verify;
