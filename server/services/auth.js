const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");

const config = require("../config");

exports.checkJWT = jwt({
  // Dynamically provide a signing key based on the kid in the header and the singing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://datfc97pro.auth0.com/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: "CtN5838LtCFYpAfjTCL3F3aw98zc0PGF",
  issuer: "https://datfc97pro.auth0.com/",
  algorithms: ["RS256"]
});

exports.checkRole = role => (req, res, next) => {
  const user = req.user;

  if (
    user &&
    user[`${config.NAMESPACE}/role`] &&
    user[`${config.NAMESPACE}/role`] === role
  ) {
    next();
  } else {
    return res.status(401).send({
      title: "Not Authorized",
      detail: "You are not authorized to access this data"
    });
  }
};
