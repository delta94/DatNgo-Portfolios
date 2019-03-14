import React from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from "../components/BasePage";
import { getBlogBySlug } from "../actions";
import { Col, Row } from "reactstrap";

const BlogDetail = props => {
  const { blog } = props;

  return (
    <BaseLayout {...props.auth} router={props.router}>
      <BasePage className="blog-detail-page">
        <Row>
          <Col md={{ size: 7, offset: 3 }}>
            <div dangerouslySetInnerHTML={{ __html: blog.story }} />
          </Col>
        </Row>
      </BasePage>
    </BaseLayout>
  );
};

export default BlogDetail;

BlogDetail.getInitialProps = async ({ query }) => {
  let blog = {};

  try {
    blog = await getBlogBySlug(query.slug);
  } catch (error) {
    console.error(error);
  }
  return { blog };
};
