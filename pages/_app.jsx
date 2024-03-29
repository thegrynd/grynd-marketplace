import { Analytics } from "@vercel/analytics/react";
import { Fragment } from "react";
import Head from "next/head";
import Router from "next/router";
import nProgress from "nprogress";
import { appWithTranslation } from "next-i18next";
import RTL from "components/RTL";
import MuiTheme from "theme/MuiTheme";
import OpenGraphTags from "utils/OpenGraphTags";
import { AppProvider } from "contexts/AppContext";
import SettingsProvider from "contexts/SettingContext";
import SnackbarProvider from "components/SnackbarProvider";
import nextI18NextConfig from "../next-i18next.config";
import "nprogress/nprogress.css";
import "simplebar/dist/simplebar.min.css";
import "../src/__server__";
import "../styles.css";
import Store from "../src/contexts/Store";
import AuthUserOrderProvider from "../src/contexts/AuthUserOrderContext";
import AuthUSellerOrderProvider from "../src/contexts/AuthSellerOrderContext";

//Binding events.
Router.events.on("routeChangeStart", () => nProgress.start());
Router.events.on("routeChangeComplete", () => nProgress.done());
Router.events.on("routeChangeError", () => nProgress.done());
// small change
nProgress.configure({
  showSpinner: false,
});
const App = ({ Component, pageProps }) => {
  const AnyComponent = Component;
  const getLayout = AnyComponent.getLayout ?? ((page) => page);
  return (
    <Fragment>
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="Grynd E-commerce Marketplace, buy and sell agro products with just one click"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <link rel="shortcut icon" href="/gryndlogo.png" />
        <OpenGraphTags />
        <title>Grynd Marketplace</title>
      </Head>

      <SettingsProvider>
        <AppProvider>
          <AuthUSellerOrderProvider>
            <AuthUserOrderProvider>
              <MuiTheme>
                <SnackbarProvider>
                  <Store>
                    <RTL>
                      {getLayout(<AnyComponent {...pageProps} />)}
                      <Analytics />
                    </RTL>
                  </Store>
                </SnackbarProvider>
              </MuiTheme>
            </AuthUserOrderProvider>
          </AuthUSellerOrderProvider>
        </AppProvider>
      </SettingsProvider>
    </Fragment>
  );
};

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// App.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);

//   return { ...appProps };
// };

export default appWithTranslation(App, nextI18NextConfig);
