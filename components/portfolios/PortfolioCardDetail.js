/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React from "react";
import moment from "moment";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const PortfolioCardDetail = props => {
  const { toggle, modal, portfolio } = props;

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>{portfolio.title}</ModalHeader>
        <ModalBody>
          <p>
            <b>Description: </b>
            {portfolio.description}
          </p>
          <p>
            <b>Company: </b>
            {portfolio.company}
          </p>
          <p>
            <b>Position: </b>
            {portfolio.position}
          </p>
          <p>
            <b>Location: </b>
            {portfolio.location}
          </p>
          <p>
            <b>Start Date: </b>
            {moment(portfolio.startDate).format("MMMM YYYY")}
          </p>
          <p>
            <b>End Date: </b>
            {portfolio.endDate
              ? moment(portfolio.endDate).format("MMMM YYYY")
              : "Still Working Here"}
          </p>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default PortfolioCardDetail;
