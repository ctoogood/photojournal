import React, { useContext } from "react";
import { makeStyles } from "@material-ui/styles";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

import { FormControl, Button } from "@material-ui/core";

import "./auth.scss";
import { AuthContext } from "../../context/auth";
import SimpleSnackbar from "../../components/snack/Snackbar";

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
    "&:hover": {
      color: "#4fa1c4",
    },
  },
  verify: {
    zIndex: "10",
  },
}));

const ChangePass = () => {
  const classes = useStyles();
  const appContext = useContext(AuthContext);
  const {
    error,
    password,
    newPassword,
    snackClose,
    success,
    message,
    handleNewPassword,
    handlePassword,
    handleChangePass,
  } = appContext;

  return (
    <>
      <h3>Change Password</h3>
      <ValidatorForm
        onSubmit={handleChangePass}
        onError={(errors) => console.log(errors)}
      >
        <div>
          <FormControl className={classes.formControl} variant="outlined">
            <TextValidator
              className={classes.input}
              id="password-input"
              variant="outlined"
              value={password}
              onChange={handlePassword}
              label="Current Password"
              type="password"
              validators={["required"]}
              errorMessages={["this field is required"]}
            />
          </FormControl>
        </div>
        <div>
          <FormControl className={classes.formControl} variant="outlined">
            <TextValidator
              className={classes.input}
              id="new-password-input"
              variant="outlined"
              value={newPassword}
              onChange={handleNewPassword}
              label="New Password"
              type="password"
              validators={["required"]}
              errorMessages={["this field is required"]}
            />
          </FormControl>
          {error ? <p style={{ color: "red" }}>{error}</p> : null}
        </div>
        <Button className={classes.button} type="submit">
          Change Password
        </Button>
      </ValidatorForm>
      <SimpleSnackbar open={success} onClose={snackClose} message={message} />
    </>
  );
};

export default ChangePass;
