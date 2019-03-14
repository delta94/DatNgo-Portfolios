import React, { useState } from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from "../components/BasePage";
import PortfolioCreateForm from "../components/portfolios/PortfolioCreateForm";
import { Row, Col } from "reactstrap";

import withAuth from "../components/hoc/withAuth";
import { createPortfolio } from "../actions";

const INITIAL_VALUES = {
  title: "",
  company: "",
  location: "",
  position: "",
  description: "",
  startDate: new Date(),
  endDate: new Date()
};

const PortfolioNew = props => {
  const [error, setError] = useState("");

  const savePortfolio = (portfolioData, { setSubmitting }) => {
    setSubmitting(true);
    createPortfolio(portfolioData)
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

  return (
    <BaseLayout {...props.auth} router={props.router}>
      <BasePage className="portfolio-create-page" title="Create New Portfolio">
        <Row>
          <Col md="6">
            <PortfolioCreateForm
              initialValues={INITIAL_VALUES}
              error={error}
              onSubmit={savePortfolio}
            />
          </Col>
        </Row>
      </BasePage>
    </BaseLayout>
  );
};

export default withAuth("siteOwner")(PortfolioNew);
