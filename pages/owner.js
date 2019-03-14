import React from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from "../components/BasePage";

import withAuth from "../components/hoc/withAuth";

const Owner = props => {
  return (
    <BaseLayout {...props.auth} router={props.router}>
      <BasePage>Owner</BasePage>
    </BaseLayout>
  );
};

export default withAuth("siteOwner")(Owner);
