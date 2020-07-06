const mongoose = require("mongoose");

const answerSchema = mongoose.Schema({
  userAnswers: [],
});

module.exports = mongoose.model("Answer", answerSchema);
