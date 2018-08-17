const mongoose = require('mongoose')
const schema = require('./submission.schema.server')
const model = mongoose.model('SubmissionModel', schema)

createSubmission = submission =>
    model.create(submission)

findAllSubmissions = () =>
    model.find()

findAllSubmissionsForStudent = studentId =>
  model.find({student: studentId})

findAllSubmissionsForQuiz = quizId =>
  model.find({quiz: quizId})

findSubmissionById = (submissionId) => {
    return model.find({"_id"  : submissionId});
}

submitQuiz = (submission, quizId, userId) =>  {
    return model.create({
        quiz: quizId,
        student: userId,
        answers: submission.questions,
        submissionTime: submission.submissionTime
    }).then((response) => {
        return response;
    });
}

module.exports = {
  createSubmission, findAllSubmissions,
  findAllSubmissionsForStudent,
  findAllSubmissionsForQuiz,
    findSubmissionById,
    submitQuiz
}