import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Back_Quiz } from '../config';


const AddQuiz = () => {
    const [title, setTitle] = useState('');
    const [questions, setQuestions] = useState([{ questionText: '', options: ['', '', '', ''], correctAnswer: '' }]);
    const navigate = useNavigate();

    const handleAddQuestion = () => {
        setQuestions([...questions, { questionText: '', options: ['', '', '', ''], correctAnswer: '' }]);
    };

    const handleQuestionChange = (index, value) => {
        const newQuestions = [...questions];
        newQuestions[index].questionText = value;
        setQuestions(newQuestions);
    };

    const handleOptionChange = (qIndex, oIndex, value) => {
        const newQuestions = [...questions];
        newQuestions[qIndex].options[oIndex] = value;
        setQuestions(newQuestions);
    };

    const handleCorrectAnswerChange = (index, value) => {
        const newQuestions = [...questions];
        newQuestions[index].correctAnswer = value;
        setQuestions(newQuestions);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newQuiz = { title, questions };
        try {
            const response = await fetch(`${Back_Quiz}Mcq`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newQuiz),
            });

            if (response.ok) {
                navigate('/DashBoard');
            } else {
                
                console.error('Failed to add quiz');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
            <h2 className="text-2xl font-bold mb-6">Add New Quiz</h2>

            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-lg">
                <label className="block text-gray-700 font-bold mb-2">Quiz Title</label>
                <input
                    type="text"
                    className="mb-4 p-2 border rounded w-full"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter quiz title"
                    required
                />

                {questions.map((question, qIndex) => (
                    <div key={qIndex} className="mb-6">
                        <label className="block text-gray-700 font-bold mb-2">Question {qIndex + 1}</label>
                        <input
                            type="text"
                            className="mb-4 p-2 border rounded w-full"
                            value={question.questionText}
                            onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                            placeholder={`Enter question ${qIndex + 1}`}
                            required
                        />

                        <div className="grid grid-cols-2 gap-4">
                            {question.options.map((option, oIndex) => (
                                <input
                                    key={oIndex}
                                    type="text"
                                    className="p-2 border rounded w-full"
                                    value={option}
                                    onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                                    placeholder={`Option ${oIndex + 1}`}
                                    required
                                />
                            ))}
                        </div>

                        <label className="block text-gray-700 font-bold mt-4">Correct Answer</label>
                        <input
                            type="text"
                            className="p-2 border rounded w-full"
                            value={question.correctAnswer}
                            onChange={(e) => handleCorrectAnswerChange(qIndex, e.target.value)}
                            placeholder="Correct answer"
                            required
                        />
                    </div>
                ))}

                <button
                    type="button"
                    onClick={handleAddQuestion}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-400 mb-4"
                >
                    Add Another Question
                </button>

                <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-400 w-full"
                >
                    Submit Quiz
                </button>
            </form>
        </div>
    );
};

export default AddQuiz;
