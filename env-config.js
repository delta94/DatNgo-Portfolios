const prod = process.env.NODE_ENV === "production";

module.exports = {
  "process.env.BASE_URL": prod
    ? "https://datngo-portfolios.herokuapp.com"
    : "http://localhost:3000",
  "process.env.NAMESPACE": "https://datngo-portfolios.herokuapp.com",
  "process.env.CLIENT_ID": "CtN5838LtCFYpAfjTCL3F3aw98zc0PGF"
};
