import React, { useState } from "react";
import {
  CardHeader,
  CardText,
  CardBody,
  CardTitle,
  Card,
  Button
} from "reactstrap";
import PortfolioCardDetail from "./PortfolioCardDetail";
import { deletePortfolio } from "../../actions";
import { Router } from "../../routes";

const displayDeleteWarning = (id, e) => {
  e.stopPropagation();
  if (confirm("Are you sure you want to delete this portfolio??")) {
    deletePortfolioReact(id);
  }
};

const deletePortfolioReact = id => {
  deletePortfolio(id)
    .then(() => {
      Router.pushRoute("/portfolios");
    })
    .catch(err => console.log(err));
};

const navigateToEdit = (id, e) => {
  e.stopPropagation();
  Router.pushRoute(`/portfolioedit/${id}/edit`);
};

const PortfolioCard = props => {
  const [isOpen, setIsOpen] = useState(false);

  const { portfolio, isSiteOwner } = props;

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <React.Fragment>
      <span onClick={handleToggle}>
        <PortfolioCardDetail
          toggle={handleToggle}
          portfolio={portfolio}
          modal={isOpen}
        />
        <Card className="portfolio-card">
          <CardHeader className="portfolio-card-header">
            {portfolio.position}
          </CardHeader>
          <CardBody>
            <p className="portfolio-card-city">{portfolio.location}</p>
            <CardTitle className="portfolio-card-title">
              {portfolio.title}
            </CardTitle>
            <CardText className="portfolio-card-text">
              {portfolio.description}
            </CardText>
            <div className="readMore">
              {isSiteOwner && (
                <React.Fragment>
                  <Button
                    onClick={e => navigateToEdit(portfolio._id, e)}
                    color="warning"
                  >
                    <i className="far fa-edit" /> Edit
                  </Button>{" "}
                  <Button
                    onClick={e => displayDeleteWarning(portfolio._id, e)}
                    color="danger"
                  >
                    <i className="far fa-trash-alt" /> Delete
                  </Button>
                </React.Fragment>
              )}
            </div>
          </CardBody>
        </Card>
      </span>
    </React.Fragment>
  );
};

export default PortfolioCard;
