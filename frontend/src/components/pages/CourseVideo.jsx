import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CSS/CourseVideo.css';

const CourseVideo = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { course } = state || {}; // Ensure state is not null to prevent crashes
  const [enrolled, setEnrolled] = useState(false);
  const [enrollmentId, setEnrollmentId] = useState(null);
  const [courseCompletion, setCourseCompletion] = useState(null); // Track course completion

  useEffect(() => {
    if (!course) {
      console.error('Course data not provided in state.');
      return;
    }

    const checkEnrollment = async () => {
      const userId = localStorage.getItem("userId");
      const courseId = course._id;

      try {
        const response = await axios.get(
          `http://localhost:8080/api/enrollment/check`,
          {
            params: { userId, courseId },
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          }
        );

        if (response.data.enrolled) {
          setEnrolled(true);
          setEnrollmentId(response.data.enrollmentId); // Store the enrollment ID
          setCourseCompletion(response.data.courseCompletion); // Set course completion status
        }
      } catch (error) {
        console.error('Error checking enrollment status:', error);
      }
    };

    checkEnrollment();
  }, [course]);

  const handleEnroll = async () => {
    if (!course) {
      alert('Course data is unavailable. Please try again.');
      return;
    }

    const userId = localStorage.getItem("userId");
    const courseId = course._id;

    try {
      const response = await axios.post(
        'http://localhost:8080/api/enrollment/enroll',
        { userId, courseId },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      alert(response.data.message);
      setEnrolled(true);
      setEnrollmentId(response.data.enrollmentId); // Set the enrollment ID
      setCourseCompletion(response.data.courseCompletion); // Set course completion status
    } catch (error) {
      console.error('Error enrolling in the course:', error);
      alert('Error enrolling in the course. Please try again.');
    }
  };

  const goToCourse = () => {
    if (!enrollmentId) {
      alert('Enrollment ID is missing. Please try again.');
      return;
    }

    // Pass the enrollmentId and courseCompletion status to the Learn page
    navigate(`/learn/${course._id}`, {
      state: { enrollmentId, courseId: course._id, courseCompletion },
    });
  };

  const getYouTubeThumbnail = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|\/u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11
      ? `https://img.youtube.com/vi/${match[2]}/hqdefault.jpg`
      : null;
  };

  if (!course) {
    return <div>Loading course data...</div>;
  }

  return (
    <div className="course-video-container">
        <h3>Category: {course.category}</h3>

      <img
        src={getYouTubeThumbnail(course.videoLink)}
        alt={course.title}
        width="100%"
        height="500px"
        className="thumbnail-image"
      />
      <div className="course-details">
      <h1>{course.title}</h1> {/* Display the course title */}

        <p>Discription : {course.description || 'No description available.'}</p>

        {enrolled ? (
          // Show different button text based on courseCompletion
          courseCompletion === 1 ? (
            <div>
              <p>Congratulations! You have completed the course.</p>
              <button className="goto-button" onClick={goToCourse}>
                Go to Course
              </button>
            </div>
          ) : (
            <button className="goto-button" onClick={goToCourse}>
              Continue Course
            </button>
          )
        ) : (
          <button className="enroll-button" onClick={handleEnroll}>
            Enroll in this Course
          </button>
        )}
      </div>
    </div>
  );
};

export default CourseVideo;
