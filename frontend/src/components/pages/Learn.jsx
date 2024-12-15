import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './CSS/Learn.css';

const Learn = () => {
  const { courseId } = useParams();
  const { state } = useLocation(); // Retrieve state passed from navigate
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const { enrollmentId, courseCompletion } = state || {}; // Extract enrollmentId and courseCompletion from state

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/courses/${courseId}`);
        setCourse(response.data);
      } catch (error) {
        console.error('Error fetching course:', error);
      }
    };

    fetchCourse();
  }, [courseId]);

  const getYouTubeId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|\/u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const handleGiveTest = () => {
    navigate(`/course/${courseId}/assessment`, {
      state: { enrollmentId },
    });
  };

  const handleUploadAssessment = () => {
    navigate(`/course/${courseId}/upload-assessment`);
  };
  const handleViewCertificate = () => {
    if (!enrollmentId) {
      alert('Enrollment ID is not available!');
      return;
    }
  
    // Navigate to the Certificate page with query parameters
    // navigate(`/certificate?enrollmentId=${enrollmentId}`);
    navigate(`/mycertificate/${enrollmentId}`);
  };
  

  if (!course) {
    return <p>Loading...</p>; // Show loading message while course data is fetched
  }

  return (
    <div className="learn-page">
      <h1 className="course-title">Course Title: {course.title|| 'No Title available for this course.'}</h1>

      <div className="video-container">
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${getYouTubeId(course.videoLink)}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Course Video"
        ></iframe>
      </div>
      <div className="learn-details">
      <p className="course-discription">Category: {course.category}</p>

        <p className="course-description">Discription: {course.description || 'No description available for this course.'}</p>
        <p className="enrollment-id"><strong>Enrollment ID:</strong> {enrollmentId || 'Not available'}</p>
        {courseCompletion === 1 && (
          <div className="certificate-section">
            <button onClick={handleViewCertificate} className="download-certificate-button">
              View Certificate
            </button>
          </div>
        )}
        <div className="button-group">
          <button onClick={handleGiveTest} className="give-test-button">
            Give Test
          </button>
          <button onClick={handleUploadAssessment} className="upload-assessment-button">
            Upload Assessment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Learn;
