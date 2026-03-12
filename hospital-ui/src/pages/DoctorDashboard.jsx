import React, { useState } from 'react';
import { User, Clock, CheckCircle, Calendar, Plus, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DoctorDashboard = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    
    const [appointments] = useState([
        { id: 1, patientName: "Srivarshini", time: "10:30 AM", status: "Confirmed" },
        { id: 2, patientName: "John Doe", time: "11:15 AM", status: "Pending" }
    ]);

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <div className="flex min-h-screen bg-slate-50">
            
            <div className="w-64 bg-slate-900 text-white p-6 flex flex-col justify-between">
                <div>
                    <div className="flex items-center gap-2 mb-10 text-blue-400 font-black text-xl">
                        <div className="bg-blue-600 text-white w-8 h-8 flex items-center justify-center rounded-lg">H</div>
                        MEDICORE
                    </div>
                    <nav className="space-y-4">
                        <div className="flex items-center gap-3 p-3 bg-blue-600 rounded-xl cursor-pointer">
                            <Calendar size={20} /> <span className="font-medium">Dashboard</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 text-slate-400 hover:text-white transition cursor-pointer">
                            <User size={20} /> <span className="font-medium">Patients</span>
                        </div>
                    </nav>
                </div>
                <button onClick={handleLogout} className="flex items-center gap-3 p-3 text-red-400 hover:bg-red-400/10 rounded-xl transition">
                    <LogOut size={20} /> <span className="font-bold">Logout</span>
                </button>
            </div>

            <div className="flex-1 p-10">
                <header className="flex justify-between items-center mb-10">
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Doctor Portal</h1>
                        <p className="text-slate-500 font-medium">Manage your daily schedule and patients.</p>
                    </div>
                    <div className="flex items-center gap-4 bg-white p-3 rounded-2xl shadow-sm border border-slate-200">
                        <div className="text-right">
                            <p className="font-bold text-slate-900">Dr. {user?.name}</p>
                            <p className="text-xs text-blue-600 font-bold uppercase tracking-wider">{user?.specialization}</p>
                        </div>
                        <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center font-black">
                            {user?.name?.charAt(0)}
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    <div className="lg:col-span-2 space-y-8">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                                <p className="text-slate-500 text-sm font-bold uppercase mb-2">Total Patients</p>
                                <h2 className="text-4xl font-black text-slate-900">12</h2>
                            </div>
                            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                                <p className="text-slate-500 text-sm font-bold uppercase mb-2">Pending Appointments</p>
                                <h2 className="text-4xl font-black text-blue-600">04</h2>
                            </div>
                        </div>

                        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                                <h3 className="font-black text-slate-900">Today's Appointments</h3>
                                <button className="text-blue-600 font-bold text-sm">View All</button>
                            </div>
                            <div className="p-6">
                                {appointments.map(app => (
                                    <div key={app.id} className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-2xl transition mb-2">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600">
                                                <User size={18} />
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-900">{app.patientName}</p>
                                                <p className="text-xs text-slate-500 flex items-center gap-1">
                                                    <Clock size={12} /> {app.time}
                                                </p>
                                            </div>
                                        </div>
                                        <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                                            {app.status}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div className="bg-blue-600 p-8 rounded-3xl text-white shadow-lg shadow-blue-200">
                            <h3 className="text-xl font-bold mb-2">Availability</h3>
                            <p className="text-blue-100 text-sm mb-6 leading-relaxed">Define your working hours so patients can book appointments.</p>
                            <button className="w-full bg-white text-blue-600 py-3 rounded-xl font-black flex items-center justify-center gap-2 hover:bg-blue-50 transition">
                                <Plus size={20} /> Add Time Slot
                            </button>
                        </div>

                        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                            <h3 className="font-black text-slate-900 mb-4">Quick Actions</h3>
                            <div className="space-y-3">
                                <div className="p-4 border border-slate-100 rounded-2xl flex items-center gap-3 cursor-pointer hover:border-blue-200 transition">
                                    <CheckCircle className="text-blue-600" size={20} />
                                    <span className="font-bold text-slate-700 text-sm">Mark as Out-of-Office</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoctorDashboard;