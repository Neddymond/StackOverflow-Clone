const User = require("../Models/user");
const express = require("express");
const router = express.Router();

/** 
 * User signup Endpoint
 */
router.post("/users", async (req, res) => {
  try {
    const user = await new User(req.body);
    await user.save();
    const token = await user.GenerateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;