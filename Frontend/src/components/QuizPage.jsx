import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import {Back_Quiz} from '../config'

const QuizPage = () => {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch quiz data
    const fetchQuiz = async () => {
      try {
        const response = await fetch(`${Back_Quiz}Mcqs/${id}`);
        const data = await response.json();
        setQuiz(data);
      } catch (error) {
        console.error("Error fetching quiz:", error);
      }
    };

    fetchQuiz();
  }, [id]);

  const handleOptionChange = (questionId, answer) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleSubmitQuiz = async () => {
    try {
        const response = await fetch(`${Back_Quiz}quiz/${id}/submit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ answer: answers }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.msg || 'Failed to submit quiz');
        }

        const result = await response.json();
        alert(`Quiz Submitted! You scored ${result.score}/${result.totalQuestions}`);
        navigate('/dashboard'); // Navigate to the dashboard
    } catch (error) {
        console.error('Error submitting quiz:', error.message);
        alert(`Failed to submit quiz: ${error.message}`);
    }
};



  if (!quiz) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">{quiz.title}</h2>
      {!isSubmitted && (
        <div className="mb-6">
          <h3 className="text-lg mb-2">{quiz.questions[currentQuestion].questionText}</h3>
          {quiz.questions[currentQuestion].options.map((option, index) => (
            <div key={index} className="mb-2">
              <label>
                <input
                  type="radio"
                  name={`question-${currentQuestion}`}
                  value={option}
                  onChange={() => handleOptionChange(quiz.questions[currentQuestion]._id, option)}
                />
                {option}
              </label>
            </div>
          ))}
          <div className="mt-4">
            {currentQuestion < quiz.questions.length - 1 ? (
              <button
                onClick={handleNextQuestion}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-400"
              >
                Next Question
              </button>
            ) : (
              <button
                onClick={handleSubmitQuiz}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-400"
              >
                Submit Quiz
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizPage;
