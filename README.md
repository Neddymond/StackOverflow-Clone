This project is an API for a basic StackOverflow clone.
IMO, the 4 basic most important StackOverflow endpoints are:
•	Signup: StackOverflow's questions and answers can be assessed without an account, but one needs an account to be able to ask questions, answer questions, or do other things like commenting and upvoting an answer. When a user signs up, we leverage JWT to generate a token in order to ensure athorization and authentication of that user.

•	Questions: I mean what's StackOverflow without questions. When a new is asked by an authenticated user, the question gets stored in the DB.

•	Answers: Each answer is related to a question. When an answer is added to a question, it gets appended to other answers to that question.

• GetQuestions: This endpoint returns all the questions (and it's answers). Redis is used to cache the returned results to optimize and increase the speed of subsequent queries.
