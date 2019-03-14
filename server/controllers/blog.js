const Blog = require("../models/blog");
const AsyncLock = require("async-lock");
const lock = new AsyncLock();
const slugify = require("slugify");

exports.createBlog = (req, res) => {
  const lockId = req.query.lockId;

  if (!lock.isBusy(lockId)) {
    lock.acquire(
      lockId,
      function(done) {
        const blogData = req.body;
        const blog = new Blog(blogData);

        if (req.user) {
          blog.userId = req.user.sub;
          blog.author = req.user.name;
        }

        blog.save((err, createdBlog) => {
          setTimeout(() => done(), 5000);

          if (err) {
            return res.status(422).send(err);
          }

          return res.json(createdBlog);
        });
      },
      function(err, ret) {
        err && console.error(err);
      }
    );
  } else {
    return res.status(422).send({ message: "Blog is getting saved!" });
  }
};

exports.getBlogById = (req, res) => {
  const blogId = req.params.id;

  Blog.findById(blogId)
    .then(data => res.json(data))
    .catch(err => res.status(422).send(err));
};

exports.updateBlog = (req, res) => {
  const blogId = req.params.id;
  const blogData = req.body;

  Blog.findById(blogId)
    .then(data => {
      data.set(blogData);

      if (blogData.status && blogData.status === "published" && !data.slug) {
        data.slug = slugify(data.title, {
          replacement: "-", // replace spaces with replacement
          remove: null, // regex to remove characters
          lower: true // result in lower case
        });
      }

      data
        .save()
        .then(data => res.json(data))
        .catch(err => res.status(422).send(err));
    })
    .catch(err => res.status(422).send(err));
};

exports.getUserBlogs = (req, res) => {
  const userId = req.user.sub;

  Blog.find({ userId })
    .sort({ createdAt: 1 })
    .then(data => res.json(data))
    .catch(err => res.status(422).send(err));
};

exports.deleteBlog = (req, res) => {
  const blogId = req.params.id;

  Blog.findByIdAndDelete(blogId)
    .then(data => res.json({ status: "Deleted" }))
    .catch(err => res.status(422).send(err));
};

exports.getBlogs = (req, res) => {
  Blog.find({ status: "published" })
    .then(data => res.json(data))
    .catch(err => res.status(422).send(err));
};

exports.getBlogBySlug = (req, res) => {
  const slug = req.params.slug;

  Blog.findOne({ slug })
    .then(data => res.json(data))
    .catch(err => res.status(422).send(err));
};
