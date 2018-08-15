module.exports = app => {

  const quizModel = require('../models/quizzes/quiz.model.server');
    const submissionModel = require('../models/quizzes/submission.model.server');
  var quizzes = require('./quizzes.json');

  createQuiz = (req, res) => {
    quizModel.createQuiz(req.body)
      .then(quiz => res.send(quiz))
  }

  findAllQuizzes = (req, res) => {
    quizModel.findAllQuizzes()
      .then(quizzes => res.send(quizzes))
  }

  findQuizById = (req, res) => {
    quizModel.findQuizById(req.params.qid)
      .then(quiz => res.send(quiz))
  }

  updateQuiz = (req, res) => {
    quizModel.updateQuiz(req.params.qid, req.body)
      .then(status => res.send(status))
  }

  deleteQuiz = (req, res) => {
    quizModel.deleteQuiz(req.params.qid)
      .then(status => res.send(status))
  }

  addQuestion = (req, res) => {
    quizModel
      .addQuestion(req.params.qid, req.params.questionId)
      .then(
        status => res.send(status),
        error => res.send(error)
      )
  }

  submitQuiz = (req, res) => {
    var quizId = req.params['qid'];
    var currentUser =   req.session.currentUser;
    var userId = currentUser._id;
    var submission = {
      answers : req.body,
        quiz : quizId,
        student : userId
    }
  submissionModel.createSubmission(submission)
      .then(submission => res.send(submission))
  }

  function findSubmissionsForQuiz(req, res) {
        var quizId = req.params.quizId;
        submissionModel
            .findAllSubmissionsForQuiz(quizId)
            .then(function (submissions) {
                res.json(submissions);
            });
    }

  app.post('/api/quiz', createQuiz);
  app.get('/api/quiz', findAllQuizzes);
  app.get('/api/quiz/:qid', findQuizById);
  app.put('/api/quiz/:qid', updateQuiz);
  app.delete('/api/quiz/:qid', deleteQuiz);
  app.put('/api/quiz/:qid/question/:questionId', addQuestion);
  app.post('/api/quiz/:qid/submission', submitQuiz);
  app.get('/api/quiz/:quizId/submissions', findSubmissionsForQuiz);

}