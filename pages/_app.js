import React, { useEffect } from "react";
import { Container } from "next/app";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/main.scss";
import "react-toastify/dist/ReactToastify.min.css";
import auth0 from "../services/auth0";
import { ToastContainer } from "react-toastify";
import Fonts from "../helpers/Fonts";
import "../styles/shared/nprogress.css";

const MyApp = props => {
  const { Component, pageProps, auth, router } = props;

  useEffect(() => {
    Fonts();
  }, []);

  return (
    <Container>
      <ToastContainer />
      <Component {...pageProps} auth={auth} router={router} />
    </Container>
  );
};

MyApp.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {};

  const user = process.browser
    ? await auth0.clientAuth()
    : await auth0.serverAuth(ctx.req);

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  const isSiteOwner =
    user && user[`${process.env.NAMESPACE}/role`] === "siteOwner";

  const auth = { user, isAuthenticated: !!user, isSiteOwner };

  return { pageProps, auth };
};

export default MyApp;
