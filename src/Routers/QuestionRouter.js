const express = require("express");
const router = express.Router();
const Question = require("../Models/question");
const auth = require("../middleware/auth");

/**
 * Endoint for submitting a new question.
 * The question asker must be a registered and authenticated user to be able to ask a question.
 */
router.post("/questions", auth, async(req, res) => {
  try {
    const question = await new Question({
      ...req.body,
      owner: req.user._id
    });

    await question.save();
    res.status(201).json(question);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;