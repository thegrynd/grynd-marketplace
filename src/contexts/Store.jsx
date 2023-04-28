import React, { useState, useEffect, useMemo } from "react";
import { LoginContext } from "./LoginContext";
import axios from "axios";
import Cookies from "js-cookie";

const Store = ({ children }) => {
  const [getAuthUser, setGetAuthUser] = useState([]);
  const [loadUser, setLoadUser] = useState(false);
  const [clientSecret, setClientSecret] = useState("");

  const url = process.env.NEXT_PUBLIC_GRYND_URL;
  const token = Cookies.get("authToken");

  useEffect(() => {
    setLoadUser(true);
    axios
      .get(`${url}/api/v1/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setGetAuthUser(response);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoadUser(false));
  }, [token]);

  const loginContextValue = useMemo(
    () => [
      getAuthUser,
      setGetAuthUser,
      loadUser,
      clientSecret,
      setClientSecret,
    ],
    [clientSecret, setClientSecret, getAuthUser, setGetAuthUser, loadUser]
  );

  return (
    <LoginContext.Provider value={loginContextValue}>
      {children}
    </LoginContext.Provider>
  );
};

export default Store;
