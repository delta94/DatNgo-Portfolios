import React, { useState } from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from "../components/BasePage";
import withAuth from "../components/hoc/withAuth";
import SlateEditor from "../components/slate-editor/Editor";
import { getBlogById, updateBlog } from "../actions";
import { toast } from "react-toastify";

const BlogEditorUpdate = props => {
  const [isSaving, setIsSaving] = useState(false);

  const updateBlogT = (story, heading) => {
    const { blog } = props;

    const updatedBlog = {};
    updatedBlog.title = heading.title;
    updatedBlog.subTitle = heading.subtitle;
    updatedBlog.story = story;

    setIsSaving(true);
    updateBlog(updatedBlog, blog._id)
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
        // Router.pushRoute(`/blogs/${data._id}/edit`);
      })
      .catch(err => {
        const message = err.message || "Server Error!";
        setIsSaving(false);
        toast.error(`🦄 ${message}`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        });
      });
  };

  const { blog } = props;

  return (
    <BaseLayout {...props.auth} router={props.router}>
      <BasePage containerClass="editor-wrapper" className="blog-editor-page">
        <SlateEditor
          initialValue={blog.story}
          isLoading={isSaving}
          save={updateBlogT}
        />
      </BasePage>
    </BaseLayout>
  );
};

export default withAuth()(BlogEditorUpdate);

BlogEditorUpdate.getInitialProps = async ({ query }) => {
  const blogId = query.id;
  let blog = {};

  try {
    blog = await getBlogById(blogId);
  } catch (error) {
    console.log(error);
  }

  return { blog };
};
