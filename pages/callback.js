import React, { useEffect } from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from "../components/BasePage";
import auth0Client from "../services/auth0";
// import { withRouter } from "next/router";

const asyncFunc = async props => {
  await auth0Client.handleAuthentication();
  props.router.push("/");
};

const Callback = props => {
  useEffect(() => {
    asyncFunc(props);
  }, []);

  return (
    <BaseLayout {...props.auth} router={props.router}>
      <BasePage>
        <h1>Verifying login data...</h1>
      </BasePage>
    </BaseLayout>
  );
};

export default Callback;
