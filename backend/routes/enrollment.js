const express = require('express');
const router = express.Router();
const CourseEnrollment = require('../models/CourseEnrollment'); // Correct model import
const Course = require('../models/Course'); // Correct model import
const { User, validate } = require("../models/user");

// const Enrollment = require('../models/CourseEnrollment'); // Correct model import


// Utility function for error handling
const sendErrorResponse = (res, statusCode, message, error = null) => {
  console.error(message, error || '');
  res.status(statusCode).json({ message });
};

// Enroll in a Course
router.post('/enroll', async (req, res) => {
  const { userId, courseId } = req.body;

  if (!userId || !courseId) {
    return sendErrorResponse(res, 400, 'userId and courseId are required.');
  }

  try {
    // Check if the user is already enrolled in the course
    const existingEnrollment = await CourseEnrollment.findOne({ userId, courseId });

    if (existingEnrollment) {
      return res.status(200).json({
        message: 'You are already enrolled in this course.',
        enrollmentId: existingEnrollment._id.toString(),
        courseCompletion: existingEnrollment.courseCompletion,
      });
    }

    // Create a new course enrollment
    const newEnrollment = await CourseEnrollment.create({ userId, courseId });

    return res.status(201).json({
      message: 'Enrollment successful!',
      enrollmentId: newEnrollment._id.toString(),
      courseCompletion: newEnrollment.courseCompletion,
    });
  } catch (error) {
    return sendErrorResponse(res, 500, 'Error enrolling in the course. Please try again.', error);
  }
});

// Check if a user is enrolled in a course
router.get('/check', async (req, res) => {
  const { userId, courseId } = req.query;

  if (!userId || !courseId) {
    return sendErrorResponse(res, 400, 'userId and courseId are required.');
  }

  try {
    const enrollment = await CourseEnrollment.findOne({ userId, courseId });

    if (enrollment) {
      return res.json({
        enrolled: true,
        enrollmentId: enrollment._id.toString(),
        courseCompletion: enrollment.courseCompletion,
      });
    }

    return res.json({ enrolled: false });
  } catch (error) {
    return sendErrorResponse(res, 500, 'Error checking enrollment status.', error);
  }
});

// Get enrollment details by enrollmentId
router.get('/:enrollmentId', async (req, res) => {
  const { enrollmentId } = req.params;

  try {
    // Validate enrollmentId
    if (!enrollmentId) {
      return sendErrorResponse(res, 400, 'enrollmentId is required.');
    }

    // Fetch enrollment data
    const enrollment = await CourseEnrollment.findById(enrollmentId).populate('courseId', 'title').populate('userId', 'name');

    if (!enrollment) {
      return sendErrorResponse(res, 404, 'Enrollment not found.');
    }

    return res.json({
      userId: enrollment.userId, // Assuming userId is an ObjectId
      courseId: enrollment.courseId, // Assuming courseId is an ObjectId
      courseCompletion: enrollment.courseCompletion,
      enrollmentId: enrollment._id.toString(),
    });
  } catch (error) {
    return sendErrorResponse(res, 500, 'Error retrieving enrollment details.', error);
  }
});


router.get('/mycertificate/:enrollmentId', async (req, res) => {
  const { enrollmentId } = req.params;

  try {
    // Fetch enrollment data from the database
    const enrollment = await CourseEnrollment.findOne({ _id: enrollmentId });


    const course = await Course.findOne({ _id: enrollment.courseId });

		const user = await User.findOne({ _id: enrollment.userId });



    

    if (!enrollment) {
      return res.status(404).json({ message: 'Enrollment not found!' });
    }

    return res.json({

      userFirstName: user.firstName, // Assuming userId is an ObjectId
      userLastName: user.lastName, // Assuming userId is an ObjectId

      
      courseId: enrollment.courseId, // Assuming courseId is an ObjectId
      courseTitle: course.title, // Assuming courseId is an ObjectId

      courseCompletion: enrollment.courseCompletion,
      enrollmentId: enrollment._id.toString(),
    });

  } catch (error) {
    console.error('Error fetching enrollment:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

module.exports = router;
