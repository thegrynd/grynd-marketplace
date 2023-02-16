import React, { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import axios from "axios";
import Cookies from "js-cookie";

const Store = ({ children }) => {
  const [user, setUser] = useState([]);

  const url = "https://gryndtech.com";
  const header = {
    "Content-Type": "application/json",
  };

  useEffect(() => {
    axios
      .post(
        `${url}/api/v1/auth/me`,
        {
          email: "seller1@gmail.com",
          password: "password$1",
        },
        header
      )
      .then(
        (response) => {
          setUser(response);
          if (response) {
            Cookies.set("authToken", response.data.token);
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);

  return (
    <AuthContext.Provider value={[user, setUser]}>
      {children}
    </AuthContext.Provider>
  );
};

export default Store;
