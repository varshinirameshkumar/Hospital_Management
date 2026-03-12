import React, { useState } from 'react';
import api from '../api/axiosConfig';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({ 
        name: '', 
        email: '', 
        role: 'PATIENT',
        specialization: '' 
    });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/auth/register', formData);
            alert("Registration Successful! Redirecting to Login...");
            navigate('/login'); 
        } 


        
        catch (err) {
            console.error(err);
            alert("Registration failed. Check if Backend is running.");
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
                        Smart <br /> <span className="text-blue-500">Care.</span>
                    </h1>
                    <p className="text-slate-400 text-xl max-w-sm leading-relaxed font-medium">
                        The next generation of hospital management. Secure, fast, and patient-focused.
                    </p>
                </div>
            </div>

            <div className="w-full lg:w-7/12 flex items-center justify-center p-8 lg:p-24">
                <div className="max-w-md w-full">
                    <div className="mb-12">
                        <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Create Account</h2>
                        <p className="text-slate-500 text-lg font-semibold">Join the network of care today.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                            <input 
                                type="text" 
                                className="w-full bg-white border-2 border-slate-100 p-4 rounded-2xl outline-none focus:border-blue-500 transition-all font-medium" 
                                placeholder="Enter your full name" 
                                required
                                onChange={e => setFormData({...formData, name: e.target.value})} 
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                            <input 
                                type="email" 
                                className="w-full bg-white border-2 border-slate-100 p-4 rounded-2xl outline-none focus:border-blue-500 transition-all font-medium" 
                                placeholder="name@hospital.com" 
                                required
                                onChange={e => setFormData({...formData, email: e.target.value})} 
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">User Category</label>
                            <div className="relative">
                                <select 
                                    className="w-full bg-white border-2 border-slate-100 p-4 rounded-2xl outline-none focus:border-blue-500 transition-all font-medium appearance-none cursor-pointer text-slate-700" 
                                    onChange={e => setFormData({...formData, role: e.target.value})}
                                >
                                    <option value="PATIENT">Patient Account</option>
                                    <option value="DOCTOR">Medical Professional</option>
                                </select>
                                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">▼</div>
                            </div>
                        </div>

                        {formData.role === 'DOCTOR' && (
                            <div className="animate-in fade-in slide-in-from-top-4 duration-500">
                                <label className="block text-sm font-bold text-slate-700 mb-2">Medical Specialization</label>
                                <input 
                                    type="text" 
                                    className="w-full bg-white border-2 border-slate-100 p-4 rounded-2xl outline-none focus:border-blue-500 transition-all font-medium" 
                                    placeholder="e.g. Neurology, Pediatrics" 
                                    required
                                    onChange={e => setFormData({...formData, specialization: e.target.value})} 
                                />
                            </div>
                        )}

                        <button type="submit" className="w-full bg-blue-600 text-white p-4 rounded-2xl font-black text-lg hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-95 mt-4">
                            Establish Account
                        </button>
                    </form>

                    <p className="mt-10 text-center text-slate-500 font-bold text-sm uppercase tracking-widest">
                        Already registered? <Link to="/login" className="text-blue-600 hover:text-blue-700 ml-2">Login Profile</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;