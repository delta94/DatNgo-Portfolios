const moongose = require("mongoose");

const Schema = moongose.Schema;

const setStringType = maxLength => {
  return { type: String, required: true, maxlength: maxLength };
};

const portfolioSchema = new Schema({
  userId: setStringType(512),
  title: setStringType(256),
  company: setStringType(256),
  location: setStringType(128),
  position: setStringType(256),
  description: setStringType(2048),
  startDate: { type: Date, required: true },
  endDate: { type: Date }
});

module.exports = moongose.model("Portfolio", portfolioSchema);
