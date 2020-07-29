const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/**
 * Since this is a basic StackOverflow clone, only the basic information about the user will be stored in the DB.
 */
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid Email");
      }
    }
  },
  password: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      if (value < 8 || value.toLowerCase().includes("password")) {
        throw new Error ("Please use a safer password");
      }
    }
  },
  username: {
    type: String,
    trim: true,
  },
  gender: {
    type: String
  },
  profilepics: {
    type: String,
    default: "./image.png"
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }]
});

/** Middleware to hash users password */
userSchema.pre("save", async function(next) {
  const user = this;

  // Hash password on user signup or modification
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

/** Generate authoriaztion token on user signup or login */
userSchema.methods.GenerateAuthToken = async function () {
  const user = this;

  const token = await jwt.sign({ _id: user._id.toString()}, process.env.SECRET_KEY);
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

/** Remove private information from data returned to the user */
userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};


const User = mongoose.model("User", userSchema);
module.exports = User;