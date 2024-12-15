
import "./CSS/Home.css";
import React from "react";

import { Link } from "react-router-dom";
export const Home = () => {
  return (
    
    <div>
      <section className="hero-section">
        <div className="hero-content">
          <h1>Master Skills with Expert-Led Courses</h1>
          <p>Join millions of learners around the globe and upgrade your knowledge today.</p>
          
            <Link
                exact
                to="/courses"
                activeClassName="active"
                className="browse-btn"
              >
                <button className="cta-btn">
                Browse Courses
                </button>
              </Link>
              
        </div>
      </section>

      <section className="featured-courses">
        <h2>Popular Courses</h2>
        <div className="courses-grid">
          <div className="course-card">
            <img src="https://cdn-icons-png.flaticon.com/512/226/226777.png" alt="Course 1" />
            <h3>Java for Beginners</h3>
            <p>Learn full-stack web development from scratch.</p>
            <button>View Course</button>
          </div>
          <div className="course-card">
            <img src="https://banner2.cleanpng.com/20190623/yp/kisspng-python-computer-icons-programming-language-executa-1713885634631.webp" alt="Course 2" />
            <h3>Mastering Python</h3>
            <p>Become a Python expert and build real-world projects.</p>
            <button>View Course</button>
          </div>
          <div className="course-card">
            <img src="https://banner2.cleanpng.com/20190623/yp/kisspng-python-computer-icons-programming-language-executa-1713885634631.webp" alt="Course 2" />
            <h3>Mastering Python</h3>
            <p>Become a Python expert and build real-world projects.</p>
            <button>View Course</button>
          </div>
          <div className="course-card">
            <img src="https://banner2.cleanpng.com/20190623/yp/kisspng-python-computer-icons-programming-language-executa-1713885634631.webp" alt="Course 2" />
            <h3>Mastering Python</h3>
            <p>Become a Python expert and build real-world projects.</p>
            <button>View Course</button>
          </div>
          <div className="course-card">
            <img src="https://cdn.iconscout.com/icon/free/png-512/free-react-logo-icon-download-in-svg-png-gif-file-formats--company-brand-world-logos-vol-4-pack-icons-282599.png?f=webp&w=256" alt="Course 3" />
            <h3>React for Beginners</h3>
            <p>Start building dynamic websites with React.</p>
            <button>View Course</button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <h2>Explore Categories</h2>
        <div className="categories-grid">
          <div className="category-card">
            <img src="https://example.com/category1.jpg" alt="Development" />
            <h3>Development</h3>
          </div>
          <div className="category-card">
            <img src="https://example.com/category2.jpg" alt="Design" />
            <h3>Design</h3>
          </div>
          <div className="category-card">
            <img src="https://example.com/category3.jpg" alt="Business" />
            <h3>Business</h3>
          </div>
        </div>
      </section>

     

      {/* Footer */}
      <footer className="footer-section">
        <p>© 2024 D2Course. All rights reserved.</p>
      </footer>
    </div>
  );
};

