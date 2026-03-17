import React, { useState, useEffect } from 'react';
import { User, Clock, Calendar, Plus, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig';

const DoctorDashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const [newSlot, setNewSlot] = useState('');
    const [slots, setSlots] = useState([]); 

    useEffect(() => {
        const fetchLatestData = async () => {
            if (!user?.email) return;
            try {
                const res = await api.get(`/auth/login`, { params: { email: user.email } });
                setSlots(res.data.availableSlots || []);
                localStorage.setItem('user', JSON.stringify(res.data));
                setUser(res.data);
            } catch (err) {
                console.error("Error fetching latest slots:", err);
            }
        };
        fetchLatestData();
    }, [user?.email]); 

    const handleAddSlot = async () => {
        if (!newSlot) return;
       
        const updatedSlots = [...slots, newSlot];
        
        try {
            
            const res = await api.post(`/auth/update-slots`, updatedSlots, {
                params: { email: user?.email }
            });
            
            setSlots(res.data.availableSlots);
            localStorage.setItem('user', JSON.stringify(res.data));
            setUser(res.data);
            setNewSlot('');
            alert("Slot added successfully!");
        } catch (err) {
            console.error(err);
            alert("Failed to update slots. Check if backend is running.");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    if (!user) return <div className="p-10">Loading...</div>;

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
                    </nav>
                </div>
                <button onClick={handleLogout} className="flex items-center gap-3 p-3 text-red-400 hover:bg-red-400/10 rounded-xl transition">
                    <LogOut size={20} /> <span className="font-bold">Logout</span>
                </button>
            </div>

            <div className="flex-1 p-10 text-left">
                <header className="flex justify-between items-center mb-10">
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Doctor Portal</h1>
                        <p className="text-slate-500 font-bold uppercase tracking-widest text-xs mt-1">Dr. {user.name} | {user.specialization}</p>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                            <h3 className="font-black text-slate-900 mb-6 text-xl">Manage Available Slots</h3>
                            <div className="flex gap-4 mb-8">
                                <input 
                                    type="time" 
                                    className="flex-1 bg-slate-100 p-4 rounded-2xl outline-none focus:ring-2 ring-blue-500 font-bold"
                                    value={newSlot}
                                    onChange={(e) => setNewSlot(e.target.value)}
                                />
                                <button onClick={handleAddSlot} className="bg-blue-600 text-white px-8 rounded-2xl font-black flex items-center gap-2 hover:bg-blue-700 transition active:scale-95">
                                    <Plus size={20} /> Add
                                </button>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {slots && slots.length > 0 ? (
                                    slots.map((slot, index) => (
                                        <div key={index} className="p-4 bg-blue-50 border border-blue-100 rounded-2xl flex justify-between items-center animate-in fade-in zoom-in duration-300">
                                            <span className="font-black text-blue-700">{slot}</span>
                                            <Clock size={16} className="text-blue-300" />
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-slate-400 font-medium italic">No slots added yet.</p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm h-fit">
                        <h3 className="font-black text-slate-900 mb-4">Quick Stats</h3>
                        <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
                            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Total Active Slots</p>
                            <p className="text-3xl font-black text-blue-600">{slots ? slots.length : 0}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoctorDashboard;