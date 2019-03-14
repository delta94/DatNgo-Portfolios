import React from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import { withRouter } from "next/router";
import BasePage from "../components/BasePage";

const Portfolio = props => {
  return (
    <BaseLayout {...props.auth} router={props.router}>
      <BasePage>
        <h1>Test</h1>
        <h1>{props.router.query.title}</h1>
      </BasePage>
    </BaseLayout>
  );
};

export default withRouter(Portfolio);
