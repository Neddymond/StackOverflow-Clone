const express = require("express");
const app = express();
require("./db/mongoose");

const userRouter = require("./Routers/userRouter");
const questionRouter = require("./Routers/QuestionRouter");
const answerRouter = require("./Routers/AnswerRouter");
const getQuestionsRouter = require("./Routers/GetQuestionsRouter");

app.use(express.json());
app.use(userRouter);
app.use(questionRouter);
app.use(answerRouter);
app.use(getQuestionsRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server is listening on port ${port}`));