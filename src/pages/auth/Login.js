import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { makeStyles } from "@material-ui/styles";
import {
  Card,
  CardContent,
  FormControl,
  InputLabel,
  OutlinedInput,
  CircularProgress,
  Button,
  Dialog,
} from "@material-ui/core";

import "./auth.scss";
import camera from "../../images/jakob-owens-FKyHyNowp-4-unsplash.jpg";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "60px",
  },
  formControl: {
    marginBottom: "1rem",
  },
  input: {
    fontSize: ".9rem",
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

const Login = () => {
  const classes = useStyles();
  const history = useHistory();
  const [login, setLogin] = useState(true);
  const [verify, setVerify] = useState(false);
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await Auth.signIn(email, password);
      const user = await Auth.currentAuthenticatedUser();
      history.push(`/profile/${user.userName}`);
    } catch (e) {
      console.log(e.message);
      alert(e.message);
      setIsLoading(false);
      if (e.message === "User is not confirmed.") {
        setVerify(true);
      }
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await Auth.signUp(email, password);
      setVerify(true);
    } catch (e) {
      console.log(e.message);
      alert(e.message);
      setIsLoading(false);
    }
  };

  const handleConfirmSignUp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await Auth.confirmSignUp(email, code);
      const user = await Auth.currentAuthenticatedUser();
      history.push(`/profile/${user.userName}`);
      setVerify(false);
    } catch (e) {
      console.log(e.message);
      alert(e.message);
      setIsLoading(false);
    }
  };

  const handleClick = () => {
    setLogin(!login);
  };

  const handleClose = () => {
    setVerify(false);
  };

  return (
    <>
      <section className="login__background">
        <img src={camera} alt="camera" />
      </section>
      <main>
        <Dialog open={verify} onClose={handleClose}>
          <Card className={classes.verify}>
            <CardContent>
              <h3>Enter Verification Code</h3>
              <form onSubmit={handleConfirmSignUp}>
                <div>
                  <FormControl
                    className={classes.formControl}
                    variant="outlined"
                  >
                    <InputLabel htmlFor="component-outlined">Code</InputLabel>
                    <OutlinedInput
                      className={classes.input}
                      id="component-outlined"
                      autoFocus
                      value={code}
                      onChange={(e) => {
                        setCode(e.target.value);
                      }}
                      label="Code"
                      type="text"
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
                      disabled={!validateForm()}
                      type="submit"
                    >
                      Submit
                    </Button>
                  )}
                </div>
              </form>
              <section className="login__noaccount">
                <p>Didn't receive a code?</p>
                <Button
                  className={classes.button}
                  color="primary"
                  type="button"
                >
                  Resend Code
                </Button>
              </section>
            </CardContent>
          </Card>
        </Dialog>
        <Card className={classes.root}>
          {login ? (
            <CardContent>
              <h3>Login</h3>
              <form onSubmit={handleLogin}>
                <div>
                  <FormControl
                    className={classes.formControl}
                    variant="outlined"
                  >
                    <InputLabel htmlFor="component-outlined">Email</InputLabel>
                    <OutlinedInput
                      className={classes.input}
                      id="component-outlined"
                      autoFocus
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      label="Email"
                      type="email"
                    />
                  </FormControl>
                </div>
                <div>
                  <FormControl
                    className={classes.formControl}
                    variant="outlined"
                  >
                    <InputLabel htmlFor="component-outlined">
                      Password
                    </InputLabel>
                    <OutlinedInput
                      className={classes.input}
                      id="component-outlined"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      label="Password"
                      type="password"
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
                      disabled={!validateForm()}
                      type="submit"
                    >
                      Login
                    </Button>
                  )}
                  <p>Forgot Your Password?</p>
                </div>
              </form>
              <section className="login__noaccount">
                <p>No Account?</p>
                <Button
                  className={classes.button}
                  color="primary"
                  type="button"
                  onClick={handleClick}
                >
                  Sign Up
                </Button>
              </section>
            </CardContent>
          ) : (
            <CardContent>
              <h3>Sign Up</h3>
              <form onSubmit={handleSignUp}>
                <div>
                  <FormControl
                    className={classes.formControl}
                    variant="outlined"
                  >
                    <InputLabel htmlFor="component-outlined">Email</InputLabel>
                    <OutlinedInput
                      className={classes.input}
                      id="component-outlined"
                      autoFocus
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      label="Email"
                      type="email"
                    />
                  </FormControl>
                </div>
                <div>
                  <FormControl
                    className={classes.formControl}
                    variant="outlined"
                  >
                    <InputLabel htmlFor="component-outlined">
                      Password
                    </InputLabel>
                    <OutlinedInput
                      className={classes.input}
                      id="component-outlined"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      label="Password"
                      type="password"
                    />
                  </FormControl>
                </div>
                <div className="auth__spaceAbove">
                  {isLoading ? (
                    <CircularProgress />
                  ) : (
                    <Button
                      className={classes.button}
                      color="secondary"
                      disabled={!validateForm()}
                      type="submit"
                    >
                      Sign Up
                    </Button>
                  )}
                </div>
              </form>
              <section className="login__noaccount">
                <p>Already Registered?</p>
                <Button
                  className={classes.button}
                  color="primary"
                  type="button"
                  onClick={handleClick}
                >
                  Login
                </Button>
              </section>
            </CardContent>
          )}
        </Card>
      </main>
    </>
  );
};

export default Login;
