import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../CSS/uploadAss.css';

const UploadAssessment = () => {
  const { courseId } = useParams(); // Get courseId from the URL
  const [questions, setQuestions] = useState([
    { questionText: '', choices: ['', '', '', ''], correctAnswer: '' }
  ]);

  // Add a new question field
  const addQuestion = () => {
    setQuestions([...questions, { questionText: '', choices: ['', '', '', ''], correctAnswer: '' }]);
  };

  // Update a question field
  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  // Update a choice for a specific question
  const handleChoiceChange = (qIndex, choiceIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].choices[choiceIndex] = value;
    setQuestions(updatedQuestions);
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:8080/api/assessments/upload/${courseId}`, {
        questions
      });
      alert(response.data.message);
    } catch (error) {
      console.error('Error uploading assessment:', error);
      alert('Error uploading assessment. Please try again.');
    }
  };

  return (
    <div className="upload-assessment">
      <h2>Upload Assessment for Course</h2>
      <form onSubmit={handleSubmit} className="assessment-form">
        {questions.map((question, qIndex) => (
          <div key={qIndex} className="question-card">
            <label>Question {qIndex + 1}</label>
            <input
              type="text"
              value={question.questionText}
              onChange={(e) => handleQuestionChange(qIndex, 'questionText', e.target.value)}
              placeholder="Enter the question"
              className="input-field"
            />

            <div className="choices">
              {question.choices.map((choice, choiceIndex) => (
                <input
                  key={choiceIndex}
                  type="text"
                  value={choice}
                  onChange={(e) => handleChoiceChange(qIndex, choiceIndex, e.target.value)}
                  placeholder={`Choice ${choiceIndex + 1}`}
                  className="input-field choice-field"
                />
              ))}
            </div>

            <label>Correct Answer</label>
            <input
              type="text"
              value={question.correctAnswer}
              onChange={(e) => handleQuestionChange(qIndex, 'correctAnswer', e.target.value)}
              placeholder="Enter the correct answer"
              className="input-field"
            />
          </div>
        ))}

        <div className="buttons">
          <button type="button" onClick={addQuestion} className="add-button">
            Add Another Question
          </button>
          <button type="submit" className="submit-button">Submit Assessment</button>
        </div>
      </form>
    </div>
  );
};

export default UploadAssessment;
