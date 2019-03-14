import React from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from "../components/BasePage";
import { Row, Col } from "reactstrap";

const CV = props => {
  return (
    <BaseLayout {...props.auth} router={props.router}>
      <BasePage title="Preview of my CV" className="cv-page">
        <Row>
          <Col md={{ size: 8, offset: 2 }}>
            <div className="cv-title">
              <a
                download="jerga_cv.pdf"
                className="btn btn-success"
                href="https://i.topcv.vn/ngongocdat?ref=1595669"
              >
                Download
              </a>
            </div>
            <iframe
              style={{ width: "100%", height: "800px" }}
              src="https://i.topcv.vn/ngongocdat?ref=1595669"
            />
          </Col>
        </Row>
      </BasePage>
    </BaseLayout>
  );
};

export default CV;
