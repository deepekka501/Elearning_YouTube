// models/Assessment.js
const mongoose = require('mongoose');

const assessmentSchema = new mongoose.Schema({
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  questions: [
    {
      questionText: { type: String, required: true },
      choices: [{ type: String, required: true }],
      correctAnswer: { type: String, required: true } // Store the correct answer
    }
  ]
});


module.exports = mongoose.model('Assessment', assessmentSchema);
