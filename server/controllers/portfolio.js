const Portfolio = require("../models/portfolio");

exports.getPortfolios = (req, res) => {
  Portfolio.find({})
    .sort({ startDate: 1 })
    .then(data => res.json(data))
    .catch(err => res.status(422).send(err));
};

exports.savePortfolio = (req, res) => {
  const portfolioData = req.body;

  const userId = req.user && req.user.sub;

  const portfolio = new Portfolio(portfolioData);

  portfolio.userId = userId;

  portfolio
    .save()
    .then(data => res.json(data))
    .catch(err => res.status(422).send(err));
};

exports.updatePortfolio = (req, res) => {
  const portfolioId = req.params.id;
  const portfolioData = req.body;

  Portfolio.findById(portfolioId)
    .then(data => {
      data.set(portfolioData);

      data
        .save()
        .then(savedPortfolio => res.json(savedPortfolio))
        .catch(err => res.status(422).send(err));
    })
    .catch(err => res.status(422).send(err));
};

exports.deletePortfolio = (req, res) => {
  const portfolioId = req.params.id;

  Portfolio.findByIdAndDelete(portfolioId)
    .then(deletedBook => res.json({ status: "DELETED" }))
    .catch(err => res.status(422).send(err));
};

exports.getPortfolioById = (req, res) => {
  const portfolioId = req.params.id;

  Portfolio.findById(portfolioId)
    .select("-__v")
    .then(data => res.json(data))
    .catch(err => res.status(422).send(err));
};
