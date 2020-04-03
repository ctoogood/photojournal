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
  Button
} from "@material-ui/core";

import "./auth.scss";
import camera from "../../images/jakob-owens-FKyHyNowp-4-unsplash.jpg";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    padding: "60px"
  },
  formControl: {
    marginBottom: "1rem"
  },
  input: {
    fontSize: "1.2rem"
  },
  button: {
    backgroundColor: "#4fa1c4",
    color: "white",
    fontWeight: "normal",
    "&:hover": {
      color: "#4fa1c4"
    }
  }
}));

const Login = () => {
  const classes = useStyles();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await Auth.signIn(email, password);
      history.push("/");
    } catch (e) {
      console.log(e.message);
      setIsLoading(false);
    }
  };

  return (
    <>
      <section className="login__background">
        <img src={camera} alt="camera" />
      </section>
      <main>
        <Card className={classes.root}>
          <CardContent>
            <h3>Login</h3>
            <form onSubmit={handleSubmit}>
              <div>
                <FormControl className={classes.formControl} variant="outlined">
                  <InputLabel htmlFor="component-outlined">Email</InputLabel>
                  <OutlinedInput
                    className={classes.input}
                    id="component-outlined"
                    autoFocus
                    value={email}
                    onChange={e => {
                      setEmail(e.target.value);
                    }}
                    label="Email"
                    type="email"
                  />
                </FormControl>
              </div>
              <div>
                <FormControl className={classes.formControl} variant="outlined">
                  <InputLabel htmlFor="component-outlined">Password</InputLabel>
                  <OutlinedInput
                    className={classes.input}
                    id="component-outlined"
                    value={password}
                    onChange={e => {
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
              <Button className={classes.button} color="primary" type="button">
                Sign Up
              </Button>
            </section>
          </CardContent>
        </Card>
      </main>
    </>
  );
};

export default Login;
