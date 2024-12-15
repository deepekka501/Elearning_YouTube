import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../CSS/MyCertificate.css';

const MyCertificate = () => {
  const { enrollmentId } = useParams(); // Extract enrollmentId from the URL
  const [enrollmentData, setEnrollmentData] = useState(null);

  useEffect(() => {
    const fetchEnrollmentData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/enrollment/mycertificate/${enrollmentId}`);
        setEnrollmentData(response.data);
      } catch (error) {
        console.error('Error fetching enrollment data:', error);
      }
    };

    if (enrollmentId) {
      fetchEnrollmentData();
    }
  }, [enrollmentId]);

  if (!enrollmentData) {
    return <p>Loading certificate...</p>;
  }

  return (
    <div className="certificate-container">
      <div className="certificate-content">
        {/* Header */}
        <div className="certificate-header">
        <h2 >Certificate of Completion</h2>
          
          {/* <h2>Course Certificate</h2> */}
        </div>

        {/* Recipient */}
        <div className="certificate-body">
          {/* <p className="cert-date">{new Date(enrollmentData.completionDate).toLocaleDateString()}</p> */}
          <h1 className="recipient-name">
            {enrollmentData.userFirstName} {enrollmentData.userLastName}
          </h1>
          <p>has successfully completed</p>
          <h2 className="course-title">{enrollmentData.courseTitle}</h2>
          <p>
            An online course offered by Our Learning Platform <strong>D2Course</strong>.
          </p>
        </div>

        {/* Footer */}
        <div className="certificate-footer">
          <div className="signature">
            <img src="https://onlinepngtools.com/images/examples-onlinepngtools/george-walker-bush-signature.png" alt="Signature" className="signature-img" />
            <p>D2Course Developer</p>
            
          </div>
          
          <div className="certificate-id">
            
            Certificate ID: <strong>{enrollmentData.enrollmentId}</strong>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCertificate;
