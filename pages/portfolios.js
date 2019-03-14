import React from "react";
import BaseLayout from "../components/layouts/BaseLayout";
// import { Link } from "../routes";
import BasePage from "../components/BasePage";
import { Col, Row, Button } from "reactstrap";
import { getPortfolio } from "../actions";
import PortfolioCard from "../components/portfolios/PortfolioCard";
import { Router } from "../routes";

const Portfolios = props => {
  const {
    portfolios,
    auth: { isSiteOwner }
  } = props;

  return (
    <BaseLayout
      {...props.auth}
      router={props.router}
      title="Dat Ngo - Learn About My Experience"
    >
      <BasePage title="Portfolios" className="portfolio-page">
        {isSiteOwner && (
          <Button
            onClick={() => Router.pushRoute("/portfolios/new")}
            className="create-port-btn"
            color="success"
          >
            Create Portfolio
          </Button>
        )}
        <Row>{renderPosts(portfolios, props)}</Row>
      </BasePage>
    </BaseLayout>
  );
};

const renderPosts = (portfolios, props) => {
  const { isSiteOwner } = props.auth;

  return portfolios.map((portfolio, index) => (
    <Col md="4" key={index}>
      <PortfolioCard portfolio={portfolio} isSiteOwner={isSiteOwner} />
    </Col>
  ));
};

Portfolios.getInitialProps = async () => {
  let portfolios = [];

  try {
    portfolios = await getPortfolio();
  } catch (error) {
    console.log(error);
  }

  return { portfolios };
};

export default Portfolios;
