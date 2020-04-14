import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import { Card, IconButton, Dialog } from "@material-ui/core";

import "./auth.scss";
import camera from "../../images/jakob-owens-FKyHyNowp-4-unsplash.jpg";
import Login from "./Login";
import { AuthContext } from "../../context/auth";
import { CloseOutlined } from "@material-ui/icons";
import SignUp from "./SignUp";
import Verify from "./Verify";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "50px",
    marginTop: "2rem",
    position: "relative",
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
  icon: {
    position: "absolute",
    top: 0,
    right: 0,
  },
}));

const AuthForm = () => {
  const classes = useStyles();
  const history = useHistory();
  const { pathname } = useLocation();
  const appContext = useContext(AuthContext);
  const { verify, login, handleClose } = appContext;

  const returnHome = () => {
    handleClose();
    history.push("/");
  };

  return (
    <section className="login__page">
      <section className="login__background">
        <img src={camera} alt="camera" />
      </section>
      <main>
        <Dialog open={verify} onClose={handleClose}>
          <Verify />
        </Dialog>
        <Card className={classes.root}>
          <IconButton className={classes.icon} onClick={returnHome}>
            <CloseOutlined />
          </IconButton>
          {!login || pathname === "/signup" ? <SignUp /> : <Login />}
        </Card>
      </main>
    </section>
  );
};

export default AuthForm;
