const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Question = require("../Models/question");

/**
 * Endpoint for adding an answer to a question.
 * The newer answers gets stacked on top.
 */
router.post("/answer/:id", auth, async (req, res) => {
 try {
   const question = await Question.findById(req.params.id);

   const newAnswer = {
     ...req.body,
     owner: req.user._id
   };

   question.answers.unshift(newAnswer);
   await question.save();

   res.json(question);
 } catch (e) {
   res.status(500).send(e);
 }
})

module.exports = router;