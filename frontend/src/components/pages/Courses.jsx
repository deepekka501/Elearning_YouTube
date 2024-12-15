import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // For navigation
import './CSS/Courses.css'; // Import the CSS file

const Courses = () => {
  const [courses, setCourses] = useState([]); // Store courses from the database
  const [filteredCourses, setFilteredCourses] = useState([]); // Filtered courses based on category and search term
  const [selectedCategory, setSelectedCategory] = useState('All'); // Track the selected category
  const [searchTerm, setSearchTerm] = useState(''); // Track search term
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false); // State to control popup visibility
  const navigate = useNavigate(); // For navigation

  // Categories (including 'All' to show all courses)
  const categories = [
    'All',
    'Programming',
    'Web Development',
    'Data Science',
    'AI/Machine Learning',
    'Software Development',
    'Cybersecurity',
    'Networking',
  ];

  // Check if user is logged in on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setShowPopup(true); // Show popup modal if not logged in
    }
  }, []);

  // Fetch courses from the backend
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/courses'); // Replace with your actual API endpoint
        setCourses(response.data); // Assuming the response contains an array of courses
        setFilteredCourses(response.data); // Initialize with all courses
      } catch (err) {
        console.error('Error fetching courses from the database:', err);
        setError('Unable to fetch courses. Please try again later.');
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

  // Handle user decision from popup
  const handleUserDecision = (decision) => {
    setShowPopup(false); // Close the popup modal
    if (decision === 'yes') {
      navigate('/login'); // Redirect to login page
    } else {
      navigate('/'); // Redirect to home page
    }
  };

  // Handle category selection
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    filterCourses(category, searchTerm);
  };

  // Handle search term change
  const handleSearchTermChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    filterCourses(selectedCategory, term);
  };

  // Filter courses based on category and search term
  const filterCourses = (category, term) => {
    let filtered = courses;

    // Filter by category if not 'All'
    if (category !== 'All') {
      filtered = filtered.filter((course) => course.category === category);
    }

    // Further filter by search term
    if (term) {
      filtered = filtered.filter((course) =>
        course.title.toLowerCase().includes(term.toLowerCase())
      );
    }

    setFilteredCourses(filtered);
  };

  if (error) return <div>{error}</div>;

  return (
    <div className="courses-container">
      <h1 className="page-title">IT & Programming Courses</h1>

      {/* Popup Modal for asking the user */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h2>You're not logged in</h2>
            <p>Would you like to log in to access more features?</p>
            <div className="popup-buttons">
              <button onClick={() => handleUserDecision('yes')}>Yes</button>
              <button onClick={() => handleUserDecision('no')}>No</button>
            </div>
          </div>
        </div>
      )}

      {/* Search Bar */}
      <form className="search-bar" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Search for IT tutorials..."
          value={searchTerm}
          onChange={handleSearchTermChange}
        />
      </form>

      {/* Category Buttons */}
      <div className="category-buttons">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-button ${
              selectedCategory === category ? 'active' : ''
            }`}
            onClick={() => handleCategorySelect(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Video Grid */}
      <div className="video-grid">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => {
            const videoId = getYouTubeId(course.videoLink); // Extract YouTube ID
            const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/0.jpg`; // YouTube thumbnail URL

            return (
              <div
                key={course._id} // Use a unique key for each course
                className="video-item"
                onClick={() => navigate(`/coursevideo/${course._id}`, { state: { course } })}
              >
                <div className="video-thumbnail">
                  <img
                    src={thumbnailUrl}
                    alt={`Thumbnail for ${course.title}`}
                  />
                </div>
                <div className="video-details">
                  <h3>{course.title}</h3> {/* Display the course title */}
                  <p>{course.category}</p> {/* Display the category */}
                </div>
              </div>
            );
          })
        ) : (
          <p>No courses found for your search.</p>
        )}
      </div>
    </div>
  );
};

export default Courses;
