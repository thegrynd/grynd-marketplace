import React from "react";
import SignUpForm from "../../src/pages-sections/forms/SignUpForm";
import Store from "../../src/contexts/Store";
const signupUser = () => {
  return (
    <div>
      <Store>
        <SignUpForm />
      </Store>
    </div>
  );
};

export default signupUser;
