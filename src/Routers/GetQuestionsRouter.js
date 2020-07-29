const express = require("express");
const router = express.Router();
const redis = require("redis");
const Question = require("../Models/question");

const client = redis.createClient(process.env.PORT || process.env.REDIS_PORT);

client.on("connect", function () {
  console.log("Hurray! Connected to Redis");
});

// console.log(client);

 // Redis key
 const key = "questions";

/**
 * This endpoint fetches questions along with the answers provided for it.
 * Redis is used to cache the response after the first request to optimize the subsequent 
 * response speed.
 */
const getQuestions = async (req, res, next) => {
  try {
    // Fetch all the questions
    const questions = await Question.find().sort({ date: "desc" });

    if (!questions) {
      res.status(404).send("No questions found");
    }

    // Set data to Redis
    await client.setex(key, 1000, questions);

    res.send({ questions } );

  } catch (e) {
    res.status(500).send(e);
  }
};

/** Cache middleware */
function cache (req, res, next) {
  client.get(key, (err, data) => {
    if (err) throw err;

    if (data !== null) {
      console.log(data);
      res.send({ data });
    } else {
      next();
    }
  });
};

router.get("/", cache, getQuestions)

module.exports = router;