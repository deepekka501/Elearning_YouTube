import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const MyCourse = () => {
    const [courses, setCourses] = useState([]);
    const location = useLocation(); // Get location to access state
    const courseIdFromState = location.state?.courseId; // Get courseId from state
    const userId = localStorage.getItem("userId"); // Get user ID from local storage

    useEffect(() => {
        const fetchMyCourses = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/enrollment/mycourses?userId=${userId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}` // Pass token in header
                    }
                });
                setCourses(response.data.courses); // Set the courses in state
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchMyCourses();
    }, [userId]);

    // Helper function to extract video ID from YouTube URL
    const getYouTubeId = (url) => {
        const regExp = /^.*(youtu.be\/|v\/|\/u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        return match && match[2].length === 11 ? match[2] : null;
    };

    return (
        <div className="my-course-container">
            <h1>My Courses</h1>
            {courses.length === 0 ? (
                <p>You are not enrolled in any courses.</p>
            ) : (
                <div className="course-list">
                    {courses.map((enrollment) => (
                        <div key={enrollment._id} className="course-item">
                            <h3>{enrollment.courseId.videoTitle}</h3>
                            <iframe
                                width="100%"
                                height="500px"
                                src={`https://www.youtube.com/embed/${getYouTubeId(enrollment.courseId.videoLink)}`}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                title={enrollment.courseId.videoTitle}
                            ></iframe>
                        </div>
                    ))}
                    {courseIdFromState && (
                        <div className="course-item">
                            {courses.find(course => course.courseId._id === courseIdFromState) ? (
                                <h3>Continuing from your last watched course</h3>
                            ) : (
                                <p>Course not found in your enrolled courses.</p>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default MyCourse;
