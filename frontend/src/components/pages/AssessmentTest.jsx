import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./CSS/AssessmentTest.css";

const AssessmentTest = () => {
  const { courseId } = useParams();
  const { state } = useLocation();
  const { enrollmentId, userId } = state || {}; // Safely access enrollmentId and userId
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [results, setResults] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAssessment = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/assessments/${courseId}`);
        setQuestions(response.data.questions);
        setAnswers(new Array(response.data.questions.length).fill(''));
      } catch (error) {
        console.error('Error fetching assessment:', error);
      }
    };

    fetchAssessment();
  }, [courseId]);

  const handleAnswerChange = (index, answer) => {
    const newAnswers = [...answers];
    newAnswers[index] = answer;
    setAnswers(newAnswers);
  };

  const handleSubmit = async () => {
    // Show confirmation popup
    const confirmSubmission = window.confirm("Are you sure you want to submit your answers?");
    if (!confirmSubmission) {
      return; // Exit if user cancels
    }

    try {
      const response = await axios.post(`http://localhost:8080/api/assessments/${enrollmentId}/submit`, {
        answers,  // Array of selected answers
        userId,   // Send userId
        courseId  // Send courseId
      });

      console.log(response.data.message);
      alert(response.data.message);

      // Assuming the response contains the results
      setResults(response.data);
    } catch (error) {
      console.error('Error submitting assessment:', error);
    }
  };

  const handleExit = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="assessment-test">
      <h2 className="assessment-title">Assessment Test</h2>
      
      {results ? (
        // Render the results if available
        <div className="results">
          <h3>Results</h3>
          <p className="score">
            Score: {results.score} / {results.total}
          </p>
          <ul className="results-list">
            {results.results.map((result, index) => (
              <li
                key={index}
                className={`result ${result.correct ? "correct" : "incorrect"}`}
              >
                {result.question} - {result.correct ? "Correct" : "Incorrect"}
              </li>
            ))}
          </ul>
          <button className="exit-button" onClick={handleExit}>
            Exit
          </button>
        </div>
      ) : (
        // Render the questions if results are not available
        <>
          {enrollmentId && (
            <p className="enrollment-id">Enrollment ID: {enrollmentId} : {userId}</p>
          )}
          <div className="question-container">
            {questions.map((question, index) => (
              <div key={index} className="question">
                <p className="question-text">{question.questionText}</p>
                <div className="choices">
                  {question.choices.map((choice, choiceIndex) => (
                    <label key={choiceIndex} className="choice">
                      <input
                        type="radio"
                        name={`question-${index}`}
                        value={choice}
                        checked={answers[index] === choice}
                        onChange={() => handleAnswerChange(index, choice)}
                      />
                      <span>{choice}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <button className="submit-button" onClick={handleSubmit}>
            Submit Answers
          </button>
        </>
      )}
    </div>
  );
};

export default AssessmentTest;
