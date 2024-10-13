import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Back_User } from '../config';



const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${Back_User}login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ Email: email, Password: password }),
            });
            const data = await response.json();
            if (response.ok) {
                console.log('Login successful:', data);
            } else {
                console.error('Error logging in:', data.msg);
            }
            navigate("/DashBoard")
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1" htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1" htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <button type="submit" className="bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-400 w-full">
                        Login
                    </button>

                    <p className="text-center mt-4">
                        Don't have an account?{' '}
                        <button
                            onClick={() => navigate('/Register')}
                            className="text-blue-500 hover:underline"
                        >
                            Sign Up
                        </button>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
