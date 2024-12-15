const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Assessment = require('../models/Assessment');
const CourseEnrollment = require('../models/CourseEnrollment');
const Course = require('../models/Course');
const { User } = require('../models/user');

// Upload or update assessment questions for a course
router.post('/upload/:courseId', async (req, res) => {
  const { courseId } = req.params;
  const { questions } = req.body;

  try {
    let assessment = await Assessment.findOne({ courseId });

    if (assessment) {
      assessment.questions = questions; // Update questions if assessment exists
    } else {
      assessment = new Assessment({ courseId, questions }); // Create a new assessment
    }

    await assessment.save();
    res.status(200).json({ message: 'Assessment uploaded successfully' });
  } catch (error) {
    console.error('Error uploading assessment:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Fetch assessment questions for a specific course
router.get('/:courseId', async (req, res) => {
  try {
    const assessment = await Assessment.findOne({ courseId: req.params.courseId });
    if (!assessment) {
      return res.status(404).json({ message: 'Assessment not found' });
    }
    res.json(assessment);
  } catch (error) {
    console.error('Error fetching assessment:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
router.post('/:enrollmentId/submit', async (req, res) => {
  const { answers, userId, courseId } = req.body;
  const { enrollmentId } = req.params;

  try {
    console.log('Submitting assessment for:', { userId, courseId, enrollmentId, answers });

    const assessment = await Assessment.findOne({ courseId });
    if (!assessment) {
      return res.status(404).json({ message: 'Assessment not found' });
    }

    const results = assessment.questions.map((question, index) => ({
      question: question.questionText,
      correct: question.correctAnswer === answers[index],
    }));

    const score = results.filter((result) => result.correct).length;
    const totalQuestions = results.length;
    const scorePercentage = (score / totalQuestions) * 100;

    console.log('Score:', score, 'Total Questions:', totalQuestions, 'Score Percentage:', scorePercentage);

    if (scorePercentage >= 50) {
      const enrollment = await CourseEnrollment.findOne({ _id: enrollmentId });
      // if (!enrollment) {
      //   return res.status(404).json({ message: 'Enrollment not found' });
      // }
      enrollment.courseCompletion = 1;
      await enrollment.save();
    }

    res.json({
      results,
      score,
      total: totalQuestions,
      scorePercentage,
      message: scorePercentage >= 50
        ? 'Congratulations! You passed the assessment, and your course is marked as completed.'
        : 'You did not pass the assessment. Try again to improve your score.',
    });
  } catch (error) {
    console.error('Error submitting assessment:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/certificate/:enrollmentId', async (req, res) => {
  const { enrollmentId } = req.params;

  console.log("Fetching courseId and userId for enrollmentId:", enrollmentId);

  try {
    // Find enrollment by ID and select only courseId and userId
    const enrollment = await CourseEnrollment.findById(enrollmentId, 'courseId userId');

    if (!enrollment) {
      return res.status(404).json({ message: 'Enrollment not found' });
    }

    console.log("Enrollment data:", enrollment);

    // Send only courseId and userId as JSON response
    res.json({
      courseId: enrollment.courseId,
      userId: enrollment.userId,
    });
  } catch (error) {
    console.error('Error fetching enrollment data:', error);
    res.status(500).json({ message: 'Error fetching enrollment data. Please try again later.' });
  }
});


module.exports = router;
