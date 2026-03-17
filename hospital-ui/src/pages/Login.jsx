import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axiosConfig';

const Login = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
    e.preventDefault();
    try {
        
        const trimmedEmail = email.trim().toLowerCase();
        
        const res = await api.get(`/auth/login`, { 
            params: { email: trimmedEmail } 
        });

        if (res.data) {
            localStorage.setItem('user', JSON.stringify(res.data));
            
            if (res.data.role === 'DOCTOR') {
                navigate('/doctor-dashboard');
            } 
            
            else {
                navigate('/patient-dashboard');
            }
        }
    } catch (err) {
        console.error("Login Error Status:", err.response?.status);
        console.error("Login Error Data:", err.response?.data);
        
        if (err.response?.status === 404) {
            alert("This email is not registered. Please register first.");
        } 
        
        else {
            alert("Something went wrong. Please check if the backend is running.");
        }
    }
};

    return (
        <div className="flex min-h-screen font-sans bg-slate-50">
            <div className="hidden lg:flex lg:w-5/12 bg-slate-900 p-20 flex-col justify-between text-white border-r border-slate-800">
                <div className="z-10 flex items-center gap-3 text-2xl font-black">
                    <span className="bg-blue-600 w-10 h-10 flex items-center justify-center rounded-xl shadow-lg">H</span>
                    <span className="tracking-tighter italic">MEDICORE</span>
                </div>

                <div className="z-10">
                    <h1 className="text-7xl font-black leading-[1] mb-8 tracking-tighter text-white">
                        Access <br /> <span className="text-blue-500">Portal.</span>
                    </h1>
                    <p className="text-slate-400 text-xl max-w-sm leading-relaxed font-medium">
                        Welcome back to your healthcare management hub.
                    </p>
                </div>
            </div>

            <div className="w-full lg:w-7/12 flex items-center justify-center p-8 lg:p-24 text-left">
                <div className="max-w-md w-full">
                    <div className="mb-12">
                        <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Welcome Back</h2>
                        <p className="text-slate-500 text-lg font-semibold">Enter your credentials to continue.</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                            <input 
                                type="email" 
                                placeholder="name@hospital.com" 
                                required
                                className="w-full bg-white border-2 border-slate-100 p-4 rounded-2xl outline-none focus:border-blue-500 transition-all font-medium"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <button type="submit" className="w-full bg-blue-600 text-white p-4 rounded-2xl font-black text-lg hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-95 mt-4">
                            Sign In to Profile
                        </button>
                    </form>

                    <p className="mt-10 text-center text-slate-500 font-bold text-sm uppercase tracking-widest">
                        New to Medicore? <Link to="/register" className="text-blue-600 hover:text-blue-700 ml-2">Register Now</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;