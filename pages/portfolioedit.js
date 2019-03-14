import React, { useState } from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from "../components/BasePage";
import PortfolioCreateForm from "../components/portfolios/PortfolioCreateForm";
import { Row, Col } from "reactstrap";

import withAuth from "../components/hoc/withAuth";
import { getPortfolioById, updatePortfolio } from "../actions";

const PortfolioEdit = props => {
  const [error, setError] = useState("");

  const savePortfolio = (portfolioData, { setSubmitting }) => {
    setSubmitting(true);
    updatePortfolio(portfolioData)
      .then(data => {
        props.router.push("/portfolios");
        setSubmitting(false);
      })
      .catch(err => {
        const error = err.message || "Server Error!";
        setSubmitting(false);
        setError(error);
      });
  };

  const { portfolio } = props;

  return (
    <BaseLayout {...props.auth} router={props.router}>
      <BasePage className="portfolio-create-page" title="Update Portfolio">
        <Row>
          <Col md="6">
            <PortfolioCreateForm
              initialValues={portfolio}
              error={error}
              onSubmit={savePortfolio}
            />
          </Col>
        </Row>
      </BasePage>
    </BaseLayout>
  );
};

export default withAuth("siteOwner")(PortfolioEdit);

PortfolioEdit.getInitialProps = async ({ query, req }) => {
  let portfolio = {};
  try {
    portfolio = await getPortfolioById(query.id, req);
  } catch (error) {
    console.log(error);
  }

  return { portfolio };
};
