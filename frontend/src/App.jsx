import "./App.css";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router,  Route, Routes,  Navigate } from "react-router-dom";
import { Home } from "./components/pages/Home";
import { About } from "./components/pages/About";
import { Contact } from "./components/pages/Contact";
import Courses from "./components/pages/Courses";
import Register from "./components/pages/Register";
import Login from "./components/pages/Login";
import Main from "./components/pages/User";
import UserHome from "./components/pages/User/Courses";
import UploadCourses from "./components/pages/Admin/UploadCourses";
import CourseVideo from "./components/pages/CourseVideo";
import MyCourse from "./components/pages/MyCourse";
import Watch from "./components/pages/Watch";
import Learn from "./components/pages/Learn";
import Certificate from "./components/pages/Certificate";

import AssessmentTest from "./components/pages/AssessmentTest"

import UploadAssessment from './components/pages/Admin/UploadAssessment';
import MyCertificate from "./components/pages/User/MyCertificate";
import AdminRegistration from "./components/pages/Admin/AdminRegistration";
import AdminLogin from "./components/pages/Admin/AdminLogin";
import AdminHome from "./components/pages/Admin/AdminHome";



// Inside the Routes component


function App() {
	const user = localStorage.getItem("token");

  return (
    <>
      <Router>
        
      <NavBar />
        <div className="pages">
          
          <Routes>
			      {/* {user && <Route path="/"  element={<Main />} />} */}

            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/courses" element={<Courses/>} />
            <Route path="/course/:id" element={<CourseVideo />} />
      
            <Route path="/contact" element={<Contact />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/user/home" element={<UserHome />} />
            <Route path="/uploadCourses" element={<UploadCourses />} />
            <Route path="/coursevideo/:id" element={<CourseVideo />} /> {/* Dynamic course route */}
            <Route path="/mycourses" element={<MyCourse />} />
            <Route path="/watch" element={<Watch />} />
            <Route path="/learn/:courseId" element={<Learn />} />

            <Route path="/course/:courseId/assessment" element={<AssessmentTest />} />

          <Route path="/course/:courseId/upload-assessment" element={<UploadAssessment />} />

          <Route path="/certificate" element={<Certificate />} />
          <Route path="/mycertificate/:enrollmentId" element={<MyCertificate />} />





          <Route path="/admin/register" element={<AdminRegistration />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/home" element={<AdminHome />} />



          </Routes>
        </div>
      </Router>
  </>
  );
}

export default App;
