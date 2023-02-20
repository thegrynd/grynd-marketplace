import React, { useState, useEffect } from "react";
import { LoginContext } from "./LoginContext";
import axios from "axios";
import Cookies from "js-cookie";

const Store = ({ children }) => {
  const [getAuthUser, setGetAuthUser] = useState([]);

  const url = "https://grynd-staging.vercel.app";
  const token = Cookies.get("authToken");

  useEffect(() => {
    axios
      .get(`${url}/api/v1/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setGetAuthUser(response);
        // if (response) {
        //   Cookies.set("authToken", response.data.token);
        // }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <LoginContext.Provider value={[getAuthUser, setGetAuthUser]}>
      {children}
    </LoginContext.Provider>
  );
};

export default Store;
