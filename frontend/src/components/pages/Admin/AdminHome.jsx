import React from 'react';
import { useNavigate } from 'react-router-dom';
// import "../Admin/CSS/HomeAdmin.css";


const AdminHome = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    alert('Logged out successfully');
    navigate('/admin/login');
  };

  return (
    <div className="container">
      <h2>Welcome, Admin!</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default AdminHome;
