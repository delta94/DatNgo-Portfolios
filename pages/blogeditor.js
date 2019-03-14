import React, { useState } from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from "../components/BasePage";
import withAuth from "../components/hoc/withAuth";
import SlateEditor from "../components/slate-editor/Editor";
import { createBlog } from "../actions";
import { Router } from "../routes";
import { toast } from "react-toastify";

const BlogEditor = props => {
  const [isSaving, setIsSaving] = useState(false);
  const [lockId, setLockId] = useState(Math.floor(1000 + Math.random() * 9000));

  const saveBlogT = (story, heading) => {
    const blog = {};
    blog.title = heading.title;
    blog.subTitle = heading.subtitle;
    blog.story = story;

    setIsSaving(true);
    createBlog(blog, lockId)
      .then(data => {
        setIsSaving(false);
        toast.success("🦄 Blog Saved Sucessfuly", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        });
        Router.pushRoute(`/blogs/${data._id}/edit`);
      })
      .catch(err => {
        const message = err.message || "Server Error!";
        toast.error(`🦄 ${message}`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        });
        setIsSaving(false);
      });
  };

  return (
    <BaseLayout {...props.auth} router={props.router}>
      <BasePage containerClass="editor-wrapper" className="blog-editor-page">
        <SlateEditor isLoading={isSaving} save={saveBlogT} />
      </BasePage>
    </BaseLayout>
  );
};

export default withAuth()(BlogEditor);
