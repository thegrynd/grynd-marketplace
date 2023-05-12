import React from "react";
import LoginForm from "../src/pages-sections/forms/LoginForm";
import Store from "../src/contexts/Store";

const loginUser = () => {
  return (
    <Store>
      <LoginForm />
    </Store>
  );
};

export default loginUser;
