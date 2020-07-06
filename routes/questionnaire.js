const express = require("express");

const isAuth = require("../middlewares/isAuth");
const isNotAttempted = require("../middlewares/isNotAttempted");

const questionnaireController = require("../controllers/questionnaire");

const router = express.Router();

router.get(
  "/questions",
  isAuth,
  isNotAttempted,
  questionnaireController.fetchQuestions
);

router.get("/answers", questionnaireController.fetchAnswers);

router.post(
  "/answers",
  isAuth,
  isNotAttempted,
  questionnaireController.postAnswer
);

module.exports = router;
