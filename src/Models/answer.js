const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
  answer: {
    type: String,
    required: true
  },
  Date: {
    type: Date,
    default: new Date.now()
  },
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});

const Answer = mongoose.model("Answer", answerSchema);
module.exports = Answer;