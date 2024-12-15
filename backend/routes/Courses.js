// Add to courseRoutes.js
const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  videoTitle: {
    type: String,
    required: true
  },
  videoLink: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  }
});


const Course = mongoose.model('Course', CourseSchema);
module.exports = { Course };
