import React from "react";
const OpenGraphTags = () => {
  return (
    <React.Fragment>
      <meta property="og:url" content="https://grynd-marketplace.vercel.app/" />
      {/* thumbnail And title for social media */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Grynd Agro Marketplace" />
      <meta
        property="og:description"
        content="Buy, sell and exchange agriculture products"
      />
      <meta property="og:image" content="/assets/images/gryndlogo1.png" />
    </React.Fragment>
  );
};
export default OpenGraphTags;
