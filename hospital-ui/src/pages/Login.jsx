import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axiosConfig';

const Login = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            
            const res = await api.get(`/auth/login`, { params: { email: email } });
            
            localStorage.setItem('user', JSON.stringify(res.data));
            if (res.data.role === 'DOCTOR') {
                navigate('/doctor-dashboard');
            } 
            else {
                navigate('/patient-dashboard');
            }
        } 
        catch (err) {
            console.error(err);
            alert("Login failed. Make sure you registered this email.");
        }
    };

    return (
        <div className="flex flex-col h-screen items-center justify-center bg-blue-50">
            <form onSubmit={handleLogin} className="p-10 bg-white rounded-2xl shadow-xl w-96 border border-blue-100">
                <h1 className="text-2xl font-bold text-blue-900 mb-6 text-center">Hospital Login</h1>
                <input type="email" placeholder="Enter registered email" required
                    className="w-full border p-3 rounded-lg mb-4 outline-blue-400"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg font-bold hover:bg-blue-700">
                    Sign In
                </button>
                <p className="mt-4 text-center text-gray-600">
                    Need an account? <Link to="/register" className="text-blue-600 font-bold hover:underline">Register</Link>
                </p>
            </form>
        </div>
    );
};

export default Login;