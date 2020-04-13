import React from "react";
import { makeStyles } from "@material-ui/styles";

import ChangePass from "../../pages/auth/ChangePass";
import { Paper } from "@material-ui/core";
import DeleteAccount from "./DeleteAccount";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "800px",
    margin: "auto",
    padding: "50px",
    textAlign: "center",
  },
}));

const AccountSettings = () => {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <h1>Account Settings</h1>
      <ChangePass />
      <DeleteAccount />
    </Paper>
  );
};

export default AccountSettings;
