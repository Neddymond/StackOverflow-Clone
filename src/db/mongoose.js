const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/StackOverflow-Api", {
  useUnifiedTopology: true,
  useCreateIndex: true,
  useNewUrlParser: true
});