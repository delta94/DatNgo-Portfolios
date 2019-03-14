import React from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from "../components/BasePage";
import withAuth from "../components/hoc/withAuth";
import { Container, Col, Row, Button } from "reactstrap";
import { getUserBlogs, updateBlog, deleteBlog } from "../actions";
import { Link, Router } from "../routes";
import ButtonDropdown from "../components/ButtonDropdown";

const UserBlogs = props => {
  const { blogs } = props;
  const { published, drafts } = separateBlogs(blogs);

  const renderBlogs = blogs => {
    return (
      <ul className="user-blogs-list">
        {blogs.map((blog, index) => (
          <li key={index}>
            <Link route={`/blogs/${blog._id}/edit`}>
              <a>{blog.title}</a>
            </Link>
            <ButtonDropdown items={dropdownOptions(blog)} />
          </li>
        ))}
      </ul>
    );
  };

  return (
    <BaseLayout {...props.auth} headerType={"landing"} router={props.router}>
      <div
        className="masthead"
        style={{ backgroundImage: "url('/static/images/home-bg.jpg')" }}
      >
        <div className="overlay" />
        <Container>
          <div className="row">
            <div className="col-lg-8 col-md-10 mx-auto">
              <div className="site-heading">
                <h1>Blogs Dashboard</h1>
                <span className="subheading">
                  Let's write some nice blog today{" "}
                  <Link route="/blogs/new">
                    <Button>Create a new Blog</Button>
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </Container>
      </div>
      <BasePage className="blog-user-page">
        <Row>
          <Col md="6" className="mx-auto text-center">
            <h2 className="blog-status-title">Published Blogs</h2>
            {renderBlogs(published)}
          </Col>
          <Col md="6" className="mx-auto text-center">
            <h2 className="blog-status-title">Draft Blogs</h2>
            {renderBlogs(drafts)}
          </Col>
        </Row>
      </BasePage>
    </BaseLayout>
  );
};

const changeBlogStatus = (blogId, status) => {
  updateBlog({ status }, blogId)
    .then(() => {
      Router.pushRoute("/userblogs");
    })
    .catch(err => console.log(err.message));
};

const deleteBlogPort = id => {
  deleteBlog(id)
    .then(() => {
      Router.pushRoute("/userblogs");
    })
    .catch(err => console.log(err));
};

const deleteBlogWarning = id => {
  if (confirm("Are you sure you want to delete this blog post??")) {
    deleteBlogPort(id);
  }
};

const createStatus = status => {
  return status === "draft"
    ? { view: "Publish Story", value: "published" }
    : { view: "Make a Draft", value: "draft" };
};

const dropdownOptions = blog => {
  const status = createStatus(blog.status);

  return [
    {
      text: status.view,
      handler: { onClick: () => changeBlogStatus(blog._id, status.value) }
    },
    { text: "Delete", handler: { onClick: () => deleteBlogWarning(blog._id) } }
  ];
};

const separateBlogs = blogs => {
  const published = [];
  const drafts = [];

  blogs.forEach(blog => {
    blog.status === "draft" ? drafts.push(blog) : published.push(blog);
  });

  return { published, drafts };
};

export default withAuth()(UserBlogs);

UserBlogs.getInitialProps = async ({ req }) => {
  let blogs = [];

  try {
    blogs = await getUserBlogs(req);
  } catch (error) {
    console.log(error);
  }

  return { blogs };
};
