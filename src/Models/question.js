const mongoose = require("mongoose");

/** This is a basic Question Model */
const questionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  answers: [{
    answer: {
      type: String,
      required: true
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    Date: {
      type: Date,
      defualt: Date.now()
    }
  }],
  date: {
    type: Date,
    default: Date.now()
  }
});

// questionSchema.virtual("answers", {
//   ref: "Answer",
//   localField: "_id",
//   foreignField: "owner"
// });

const Question = mongoose.model("Question", questionSchema);
module.exports = Question;