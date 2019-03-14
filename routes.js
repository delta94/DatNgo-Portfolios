const routes = require("next-routes");

module.exports = routes()
  .add("portfolionew", "/portfolios/new")
  .add("portfolio", "/portfolio/:id")
  .add("portfolioedit", "/portfolioedit/:id/edit")
  .add("userblogs", "/blogs/dashboard")
  .add("blogeditor", "/blogs/new")
  .add("blogdetail", "/blogs/:slug")
  .add("blogeditorupdate", "/blogs/:id/edit");
