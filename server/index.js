const express = require("express");
const next = require("next");
const routes = require("../routes");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const compression = require("compression");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = routes.getRequestHandler(app);

const authServices = require("./services/auth");

const config = require("./config");
const bookRouters = require("./routes/book");
const portfolioRouters = require("./routes/portfolio");
const blogRoutes = require("./routes/blog");

const robotsOptions = {
  root: path.join(__dirname, "../static"),
  headers: {
    "Content-Type": "text/plain;charset=UTF-8"
  }
};

const secretData = [
  { title: "SecretData 1", description: "Plans how to build spaceship" },
  { title: "SecretData 2", description: "My secret passwords" }
];

mongoose
  .connect(config.DB_URI, {
    useNewUrlParser: true
  })
  .then(() => {
    console.log("Database Connected");
  })
  .catch(err => console.log(err));

app.prepare().then(() => {
  const server = express();
  server.use(compression());
  server.use(bodyParser.json());
  server.use(cookieParser());

  server.use("/api/v1/books", bookRouters);
  server.use("/api/v1/portfolios", portfolioRouters);
  server.use("/api/v1/blogs", blogRoutes);

  server.get("/robots.txt", (req, res) => {
    return res.status(200).sendFile("robots.txt", robotsOptions);
  });

  server.get("/api/v1/secret", authServices.checkJWT, (req, res) => {
    res.json(secretData);
  });

  server.get(
    "/api/v1/onlysiteowner",
    authServices.checkJWT,
    authServices.checkRole("siteOwner"),
    (req, res) => {
      console.log(req.user);
      res.json(secretData);
    }
  );

  server.get("*", (req, res) => {
    return handle(req, res);
  });

  server.use(function(err, req, res, next) {
    if (err.name === "UnauthorizedError") {
      res
        .status(401)
        .send({ title: "Unauthorized", detail: "Unauthorized Access!" });
    }
  });

  server.use(handle).listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
