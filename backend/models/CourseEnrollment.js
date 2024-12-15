const mongoose = require('mongoose');

const CourseEnrollmentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User collection
    required: true,
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course', // Reference to the Course collection
    required: true,
  },
  enrollmentDate: {
    type: Date,
    default: Date.now,
  },
  courseCompletion: {
    type: Number, // 0 for incomplete, 1 for completed
    default: 0,
  },
});

const CourseEnrollment = mongoose.model('CourseEnrollment', CourseEnrollmentSchema);

module.exports = CourseEnrollment ;
