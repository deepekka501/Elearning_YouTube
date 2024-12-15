import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios'; // Import axios for making HTTP requests

const Watch = () => {
    const { state } = useLocation(); // Access passed state
    const { courseId } = state; // Destructure courseId from state
    const [course, setCourse] = useState(null); // State to hold course details
    const [loading, setLoading] = useState(true); // State to manage loading status

    // Fetch course details based on courseId
    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/courses/${courseId}`); // Adjust this endpoint as needed
                setCourse(response.data); // Set course data
            } catch (error) {
                console.error('Error fetching course details:', error);
            } finally {
                setLoading(false); // Set loading to false once fetching is done
            }
        };

        fetchCourse();
    }, [courseId]);

    // Helper function to extract video ID from the YouTube URL
    const getYouTubeId = (url) => {
        const regExp = /^.*(youtu.be\/|v\/|\/u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        return match && match[2].length === 11 ? match[2] : null;
    };

    // Loading state
    if (loading) {
        return <div>Loading...</div>; // Loading message while fetching
    }

    // If no course found
    if (!course) {
        return <div>No course found!</div>; // Handle case where no course data is available
    }

    return (
        <div className="watch-container">
            <h1>{course.videoTitle}</h1>
            <iframe
                width="100%"
                height="500px"
                src={`https://www.youtube.com/embed/${getYouTubeId(course.videoLink)}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={course.videoTitle}
            ></iframe>
            <div className="course-details">
                <h3>Category: {course.category}</h3>
                <p>{course.description || 'No description available.'}</p>
            </div>
        </div>
    );
};

export default Watch;
