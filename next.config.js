const { i18n } = require("./next-i18next.config");

module.exports = {
  i18n,
  devIndicators: {},
  publicRuntimeConfig: {
    // Available on both server and client
    theme: "DEFAULT",
    currency: "RWF",
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
};
