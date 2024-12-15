const express = require("express");
const router = express.Router();
const Course = require("../models/Course");

// POST route to upload a new course
router.post("/", async (req, res) => {
  try {
    const { category, videoLink, title, description } = req.body;

    // Check if the required fields are provided
    if (!title || !videoLink || !category) {
      return res.status(400).json({ message: "Title, videoLink, and category are required." });
    }

    // Create a new course with the title and description
    const newCourse = new Course({
      category,
      videoLink,
      title,
      description: description || "No description available", // Default description if none provided
    });

    // Save the course to the database
    await newCourse.save();
    res.status(201).json({ message: "Course uploaded successfully!", course: newCourse });
  } catch (error) {
    console.error("Error uploading course:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

// GET route to fetch all courses
router.get("/", async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching courses" });
  }
});

// GET route to fetch a single course by ID
router.get("/:id", async (req, res) => {
  const courseId = req.params.id;
  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json(course);
  } catch (error) {
    console.error("Error fetching course:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
