import React, { useState, useEffect } from "react";
import { Auth, Hub } from "aws-amplify";

const AuthContext = React.createContext();

const AuthProvider = props => {
  let [user, setUser] = useState(null);

  useEffect(() => {
    let updateUser = async authState => {
      try {
        let user = await Auth.currentAuthenticatedUser();
        setUser(user);
      } catch {
        setUser(null);
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
        user
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export { AuthProvider, AuthContext };
