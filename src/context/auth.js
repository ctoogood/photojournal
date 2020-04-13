import React, { useState, useEffect } from "react";
import { Auth, Hub } from "aws-amplify";

const AuthContext = React.createContext();

const AuthProvider = (props) => {
  let [user, setUser] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [code, setCode] = useState("");
  const [verify, setVerify] = useState(false);
  const [login, setLogin] = useState(true);
  const [codeSubmit, setCodeSubmit] = useState(false);
  const [forgotPass, setForgotPass] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await Auth.signIn(email, password);
      setIsLoading(false);
      setPassword("");
      setEmail("");
    } catch (e) {
      console.log(e.message);
      setIsLoading(false);
      if (e.message === "User is not confirmed.") {
        setVerify(true);
      } else {
        setError(e.message);
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
      setError(e.message);
      setIsLoading(false);
    }
  };

  const handleConfirmSignUp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await Auth.confirmSignUp(email, code);
      setVerify(false);
    } catch (e) {
      console.log(e.message);
      setError(e.message);
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setVerify(false);
    setEmail("");
    setPassword("");
    setError("");
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleNewPassword = (e) => {
    setNewPassword(e.target.value);
  };

  const changeMode = () => {
    setLogin(!login);
  };

  const handleVerify = () => {
    setVerify(!verify);
  };

  const handleForgotPass = () => {
    setForgotPass(true);
  };

  const handlePassReset = (e) => {
    e.preventDefault();
    Auth.forgotPassword(email)
      .then(setCodeSubmit(true))
      .catch((err) => console.log(err));
  };

  const handleCode = (e) => {
    setCode(e.target.value);
  };

  const handleNewPassSubmit = (e) => {
    e.preventDefault();
    Auth.forgotPasswordSubmit(email, code, password)
      .then(
        setForgotPass(false),
        setCodeSubmit(false),
        setPassword(""),
        alert("Your password has been changed!")
      )
      .catch((err) => console.log(err));
  };

  const handleBackLogin = () => {
    setForgotPass(false);
    setCodeSubmit(false);
  };

  const handleChangePass = (e) => {
    e.preventDefault();
    Auth.currentAuthenticatedUser()
      .then((user) => {
        return Auth.changePassword(user, password, newPassword);
      })
      .then(setPassword(""), setNewPassword(""), snack("Password Changed"))
      .catch((err) => setError(err.message), setSuccess(false));
  };

  const snack = (msg) => {
    setSuccess(true);
    setMessage(msg);
  };

  const snackClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSuccess(false);
    setMessage("");
  };

  useEffect(() => {
    let updateUser = async (authState) => {
      try {
        let user = await Auth.currentAuthenticatedUser();
        setUser(user);
        setError("");
      } catch {
        setUser(null);
        setError("");
      }
    };

    Hub.listen("auth", updateUser); // listen for login/signup events
    console.log();
    updateUser(); // check manually the first time because we won't get a Hub event
    return () => Hub.remove("auth", updateUser); // cleanup
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        user,
        login,
        email,
        error,
        code,
        verify,
        password,
        forgotPass,
        codeSubmit,
        newPassword,
        success,
        message,
        snackClose,
        snack,
        handleClose,
        handleCode,
        handleVerify,
        handleLogin,
        handleEmail,
        handlePassword,
        handleForgotPass,
        handlePassReset,
        handleNewPassSubmit,
        handleNewPassword,
        handleBackLogin,
        handleSignUp,
        handleConfirmSignUp,
        handleChangePass,
        changeMode,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export { AuthProvider, AuthContext };
