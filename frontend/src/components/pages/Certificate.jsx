import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const Certificate = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const enrollmentId = params.get('enrollmentId');

  const [data, setData] = useState({ courseId: '', userId: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    if (!enrollmentId) {
      setError('Enrollment ID is missing.');
      return;
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/assessments/certificate/${enrollmentId}`);
        setData(response.data);
      } catch (err) {
        console.error('Error fetching enrollment data:', err);
        setError('Error fetching enrollment data. Please try again later.');
      }
    };

    fetchData();
  }, [enrollmentId]);

  if (error) {
    return <p style={{ textAlign: 'center', color: 'red', fontWeight: 'bold' }}>{error}</p>;
  }

  if (!data.courseId && !data.userId) {
    return <p style={{ textAlign: 'center', fontWeight: 'bold' } }>Loading data...</p>;
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Enrollment Information</h1>
      <p><strong>Course ID:</strong> {data.courseId}</p>
      <p><strong>User ID:</strong> {data.userId}</p>
    </div>
  );
};

export default Certificate;
