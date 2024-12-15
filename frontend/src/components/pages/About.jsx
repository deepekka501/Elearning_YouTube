import React from 'react';
import './CSS/About.css';

export const About = () => {
  return (
    <section className="about-section">
      <div className="container">
        {/* Hero Section */}
        <div className="about-hero">
          <h1>About Us</h1>
          <p>
            We are committed to delivering the best educational content to help you learn, grow, and succeed.
          </p>
        </div>

        {/* Mission and Vision Section */}
        <div className="mission-vision">
          <div className="mission">
            <h2>Our Mission</h2>
            <p>
              To empower students and professionals worldwide by providing easy access to high-quality educational content and resources.
            </p>
          </div>
          <div className="vision">
            <h2>Our Vision</h2>
            <p>
              To become the leading global platform for learning, helping individuals reach their full potential through knowledge and skill-building.
            </p>
          </div>
        </div>

        {/* Team Section */}
        <div className="team-section">
          <h2>Meet Our Team</h2>
          <div className="team-members">
            <div className="team-member">
              <img src="https://via.placeholder.com/150" alt="Team Member" />
              <h3>John Doe</h3>
              <p>CEO & Founder</p>
            </div>
            <div className="team-member">
              <img src="https://via.placeholder.com/150" alt="Team Member" />
              <h3>Jane Smith</h3>
              <p>Chief Operations Officer</p>
            </div>
            <div className="team-member">
              <img src="https://via.placeholder.com/150" alt="Team Member" />
              <h3>Sarah Lee</h3>
              <p>Head of Marketing</p>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="testimonials">
          <h2>What Our Students Say</h2>
          <div className="testimonial-cards">
            <div className="testimonial-card">
              <p>"The courses are really comprehensive and easy to follow. I learned so much in just a few weeks!"</p>
              <h3>- Alice</h3>
            </div>
            <div className="testimonial-card">
              <p>"This platform has transformed the way I approach learning. The instructors are top-notch."</p>
              <h3>- Michael</h3>
            </div>
            <div className="testimonial-card">
              <p>"I would recommend this platform to anyone looking to upskill in their career."</p>
              <h3>- Emily</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
