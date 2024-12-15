// Courses.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
// import styles from "./CSS/courses.module.css";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch all courses from the backend
    const fetchCourses = async () => {
      try {
        const url = "http://localhost:8080/api/courses";
        const { data } = await axios.get(url);
        setCourses(data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching courses");
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Helper function to extract video ID from the YouTube URL
  const getYouTubeId = (url) => {
    const regExp =
      /^.*(youtu.be\/|v\/|\/u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={styles.coursesContainer}>
      {courses.map((course) => {
        const videoId = getYouTubeId(course.videoLink);
        const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/0.jpg`; // YouTube thumbnail
        const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

        return (
          <div key={course._id} className={styles.courseCard}>
            <a href={videoUrl} target="_blank" rel="noopener noreferrer">
              <img
                src={thumbnailUrl}
                alt={`Thumbnail for ${course.category}`}
                className={styles.thumbnail}
              />
              <h3 className={styles.title}>{course.category}</h3>
            </a>
          </div>
        );
      })}
    </div>
  );
};

export default Courses;
