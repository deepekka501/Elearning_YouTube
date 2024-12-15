import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../CSS/UploadCourses.css"; // Custom CSS for styling

const UploadCourses = () => {
  const [courseData, setCourseData] = useState({
    category: "",
    videoLink: "",
    title: "",
    description: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCourseData({
      ...courseData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const youtubeUrlPattern = /^(https?\:\/\/)?(www\.youtube\.com|youtu\.be)\/.+$/;
    if (!youtubeUrlPattern.test(courseData.videoLink)) {
      setError("Please enter a valid YouTube video URL.");
      return;
    }

    if (!courseData.title || !courseData.category || !courseData.videoLink) {
      setError("Title, category, and video link are required.");
      return;
    }

    console.log("Form Data Before Submission:", courseData);

    try {
      const url = "http://localhost:8080/api/courses";
      const { data: res } = await axios.post(url, courseData);
      console.log("Response from API:", res);
      setSuccess("Course uploaded successfully!");
      setCourseData({ category: "", videoLink: "", title: "", description: "" });
    } catch (error) {
      console.error("API Error:", error);
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="upload-courses-container">
      <h1>Upload a New Course</h1>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <form onSubmit={handleSubmit} className="upload-form">
        <label htmlFor="category">Category:</label>
        <select
          name="category"
          value={courseData.category}
          onChange={handleChange}
          required
          className="input-field"
        >
          <option value="" disabled>
            Select a category
          </option>
          <option value="Programming">Programming</option>
          <option value="Web Development">Web Development</option>
          <option value="Data Science">Data Science</option>
          <option value="AI/Machine Learning">AI/Machine Learning</option>
          <option value="Software Development">Software Development</option>
          <option value="Cybersecurity">Cybersecurity</option>
          <option value="Networking">Networking</option>
        </select>

        <label htmlFor="videoLink">YouTube Video Link:</label>
        <input
          type="url"
          name="videoLink"
          value={courseData.videoLink}
          onChange={handleChange}
          placeholder="Enter YouTube video link"
          required
          className="input-field"
        />

        <label htmlFor="title">Title:</label>
        <input
          type="text"
          name="title"
          value={courseData.title}
          onChange={handleChange}
          placeholder="Course Title"
          required
          className="input-field"
        />

        <label htmlFor="description">Description:</label>
        <textarea
          name="description"
          value={courseData.description}
          onChange={handleChange}
          placeholder="Course Description"
          className="input-field"
        />

        <button type="submit" className="submit-btn">
          Upload Course
        </button>
      </form>
    </div>
  );
};

export default UploadCourses;
