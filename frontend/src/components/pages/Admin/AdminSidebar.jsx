import { Link, useNavigate } from "react-router-dom";
import "./CSS/AdminSidebar.css";

const AdminSidebar = () => {
  const navigate = useNavigate();

  // Logout functionality
  const handleLogout = () => {
    localStorage.removeItem("adminToken"); // Clear admin token
    navigate("/admin/login"); // Redirect to admin login
  };

  return (
    <div className="admin-sidebar">
      <h2 className="sidebar-title">Admin Dashboard</h2>
      <ul className="sidebar-links">
        <li>
          <Link to="/admin/home">Dashboard</Link>
        </li>
        <li>
          <Link to="/uploadCourses">Upload Courses</Link>
        </li>
        <li>
          <Link to="/course/:courseId/upload-assessment">Upload Assessment</Link>
        </li>
        <li>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
