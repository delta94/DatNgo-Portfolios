import React from "react";
import BaseLayout from "../layouts/BaseLayout";
import BasePage from "../BasePage";

export default role => Component => {
  const withAuth = props => {
    return renderProtectedPage(Component, props, role);
  };

  withAuth.getInitialProps = async args => {
    const pageProps =
      (await Component.getInitialProps) &&
      (await Component.getInitialProps(args));

    return { ...pageProps };
  };

  return withAuth;
};

const renderProtectedPage = (Component, props, role) => {
  const { isAuthenticated, isSiteOwner } = props.auth;
  let isAuthorized = false;

  if (role) {
    if (isSiteOwner) {
      isAuthorized = true;
    }
  } else {
    isAuthorized = true;
  }

  if (!isAuthenticated) {
    return (
      <BaseLayout {...props.auth}>
        <BasePage>
          <h1>You are not authenticated. Please login to access this page.</h1>
        </BasePage>
      </BaseLayout>
    );
  } else if (!isAuthorized) {
    return (
      <BaseLayout {...props.auth}>
        <BasePage>
          <h1>
            You are not authorized. You dont have a permission to visit this
            page.
          </h1>
        </BasePage>
      </BaseLayout>
    );
  } else {
    return <Component {...props} />;
  }
};
