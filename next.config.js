import { i18n } from "./next-i18next.config";

export default {
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
