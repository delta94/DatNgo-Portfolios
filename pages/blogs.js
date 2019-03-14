import React from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from "../components/BasePage";
import { Container, Row, Col } from "reactstrap";
import { Link } from "../routes";
import moment from "moment";
import { getBlogs } from "../actions";
import { shortenText } from "../helpers/until";

const Blogs = props => {
  const { blogs } = props;

  const renderBlogs = () =>
    blogs.map((blog, index) => (
      <div className="post-preview" key={index}>
        <Link route={`/blogs/${blog.slug}`}>
          <a>
            <h2 className="post-title">{blog.title}</h2>
            <h3 className="post-subtitle">{shortenText(blog.subTitle)}</h3>
          </a>
        </Link>
        <p className="post-meta">
          Posted by
          <a href="#"> {blog.author} </a>
          {moment(blog.createdAt).format("LLLL")}
        </p>
      </div>
    ));

  return (
    <BaseLayout
      router={props.router}
      {...props.auth}
      headerType={"landing"}
      className="blog-listing-page"
      title="Dat Ngo - Newest Blogs to Read"
    >
      <div
        className="masthead"
        style={{ backgroundImage: "url('/static/images/home-bg.jpg')" }}
      >
        <div className="overlay" />
        <Container>
          <div className="row">
            <div className="col-lg-8 col-md-10 mx-auto">
              <div className="site-heading">
                <h1>Fresh Blogs</h1>
                <span className="subheading">Programming, travelling...</span>
              </div>
            </div>
          </div>
        </Container>
      </div>
      <BasePage className="blog-body">
        <Row>
          <Col md="10" lg="8" className="mx-auto">
            {renderBlogs(blogs)}
            <div className="clearfix">
              <a className="btn btn-primary float-right" href="#">
                Older Posts &rarr;
              </a>
            </div>
          </Col>
        </Row>

        <footer>
          <Container>
            <Row>
              <div className="col-lg-8 col-md-10 mx-auto">
                <ul className="list-inline text-center">
                  <li className="list-inline-item">
                    <a href="https://www.facebook.com/dat20897" target="_blank">
                      <span className="fa-stack fa-lg">
                        <i className="fas fa-circle fa-stack-2x" />
                        <i className="fab fa-facebook-f fa-stack-1x fa-inverse" />
                      </span>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a
                      href="https://github.com/datfc97pro?tab=repositories"
                      target="_blank"
                    >
                      <span className="fa-stack fa-lg">
                        <i className="fas fa-circle fa-stack-2x" />
                        <i className="fab fa-github fa-stack-1x fa-inverse" />
                      </span>
                    </a>
                  </li>
                </ul>
                <p className="copyright text-muted">
                  Copyright &copy; Dat Ngo {moment().year()}
                </p>
              </div>
            </Row>
          </Container>
        </footer>
      </BasePage>
    </BaseLayout>
  );
};

Blogs.getInitialProps = async ({ req }) => {
  let blogs = {};

  try {
    blogs = await getBlogs(req);
  } catch (error) {
    console.log(error);
  }

  return { blogs };
};

export default Blogs;
