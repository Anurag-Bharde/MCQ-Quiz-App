import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Back_Quiz } from '../config'; // You can still keep this for API calls if needed.

const Dashboard = () => {
    const [quizzes, setQuizzes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const response = await fetch(`${Back_Quiz}Mcqs`); // For API, backend URL is fine
                const data = await response.json();
                setQuizzes(data);
            } catch (error) {
                console.error('Error fetching quizzes:', error);
            }
        };

        fetchQuizzes();
    }, []);

    const handleLogout = () => {
        navigate('/login');
    };

    const handleQuizClick = (quizId) => {
        // Update this line to navigate to the quiz page within the frontend routes
        navigate(`/Quiz/${quizId}`);
    };

    return (
        <div className="min-h-screen">
            <nav className="bg-blue-600 p-4 flex justify-between items-center">
                <button 
                    // onClick={() => navigate('/Add-Quiz')}
                    // className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-400"
                >
                    
                </button>
                <button 
                    onClick={handleLogout}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-400"
                >
                    Logout
                </button>
            </nav>

            <div className="p-6">
                <h2 className="text-2xl font-bold mb-4">Available Quizzes</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {quizzes.map((quiz) => (
                        <div
                            key={quiz._id}
                            className="bg-white p-4 rounded-md shadow hover:shadow-lg cursor-pointer"
                            onClick={() => handleQuizClick(quiz._id)}
                        >
                            <h3 className="text-xl font-bold">{quiz.title}</h3>
                            <p className="text-gray-500">{new Date(quiz.createdAt).toLocaleDateString()}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

