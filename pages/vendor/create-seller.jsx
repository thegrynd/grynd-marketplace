import React from "react";
import Store from "../../src/contexts/Store";
import CreateSellerForm from "../../src/pages-sections/forms/CreateSellerForm";

const createSeller = () => {
  return (
    <div>
      <Store>
        <CreateSellerForm />
      </Store>
    </div>
  );
};

export default createSeller;
