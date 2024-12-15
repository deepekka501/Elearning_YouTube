const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  videoLink: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        // Basic YouTube URL validation
        return /^(https?\:\/\/)?(www\.youtube\.com|youtu\.be)\/.+$/.test(v);
      },
      message: (props) => `${props.value} is not a valid YouTube URL!`,
    },
  },
  title: {
    type: String,
    default: 'No description available', // Default if no description is provided

    required: true, // Ensure that title is always provided
  },
  description: {
    type: String,
    default: 'No description available', // Default if no description is provided
  },
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
