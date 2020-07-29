const jwt = require("jsonwebtoken");
const User = require("../Models/user");

/** Here, jwt is used to verify that a user is authenticated */
const auth = async(req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const verifiedToken = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findOne({ _id: verifiedToken._id, "tokens.token": token });

    if (!user) {
      throw new Error();
    }

    req.user = user;
    req.token = token;

    next();
  } catch (e) {
    res.status(401).send("Please authenticate");
  }
};

module.exports = auth;