import React, { useState, useEffect } from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: (token) => {},
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    const userToken = localStorage.getItem("token");

    if (userToken) {
      setIsLoggedIn(true);
      setToken(userToken);
    }
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setToken("");
  };

  const loginHandler = (token) => {
    localStorage.setItem("token", token);
    setIsLoggedIn(true);
    setToken(token);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler,
        token: token,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
