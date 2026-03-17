import React, { useState, useEffect } from 'react';
import { User, Calendar, Search, LogOut, Clock, Activity, CheckCircle, MapPin, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig';

const PatientDashboard = () => {
    const navigate = useNavigate();

    // 1. States
    const [user] = useState(JSON.parse(localStorage.getItem('user')));
    const [doctors, setDoctors] = useState([]);
    const [myAppointments, setMyAppointments] = useState([]);
    const [view, setView] = useState('browse'); 
    const [searchTerm, setSearchTerm] = useState('');

    // 2. Fetch Doctors Logic
    const fetchDoctors = async () => {
        try {
            console.log("Fetching doctors...");
            const res = await api.get('/auth/doctors');
            console.log("Doctors received:", res.data);
            setDoctors(res.data || []);
        } catch (err) {
            console.error("Error fetching doctors:", err);
            setDoctors([]); // Fallback to empty array
        }
    };

    // 3. Fetch My Appointments Logic
    const fetchMyAppointments = async () => {
        if (!user?.email) return;
        try {
            const res = await api.get('/auth/my-appointments', { 
                params: { email: user.email } 
            });
            setMyAppointments(res.data || []);
        } catch (err) {
            console.error("Error fetching appointments:", err);
            setMyAppointments([]);
        }
    };

    // 4. Initial Load
    useEffect(() => {
        if (user && user.email) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            fetchDoctors();
            fetchMyAppointments();
        } 
        
        
        else {
            navigate('/login'); 
        }
    }, [user, navigate]);

    // 5. Booking Handler
    const handleBooking = async (doctor, slot) => {
        try {
            const appointmentData = {
                patientEmail: user.email,
                doctorEmail: doctor.email,
                doctorName: doctor.name,
                slot: slot,
                status: "BOOKED"
            };
            
            await api.post('/auth/book-appointment', appointmentData);
            alert(`Success! Appointment with Dr. ${doctor.name} at ${slot} confirmed.`);
            
            // UI Update
            fetchDoctors(); 
            fetchMyAppointments();
        } catch (err) {
            console.error(err);
            alert("Booking failed. Please try again.");
        }
    };

    // Filter Logic for Search
    const filteredDoctors = doctors.filter(doc => {
        const nameMatch = doc.name?.toLowerCase().includes(searchTerm.toLowerCase());
        const specMatch = doc.specialization?.toLowerCase().includes(searchTerm.toLowerCase());
        return nameMatch || specMatch;
    });

    if (!user) return <div className="p-10 font-bold">Redirecting to login...</div>;

    return (
        <div className="flex min-h-screen bg-slate-50 font-sans text-left text-slate-900">
            {/* Sidebar */}
            <div className="w-72 bg-slate-900 text-white p-8 flex flex-col justify-between hidden md:flex sticky top-0 h-screen">
                <div>
                    <div className="flex items-center gap-3 mb-12 text-blue-400 font-black text-2xl">
                        <div className="bg-blue-600 text-white w-10 h-10 flex items-center justify-center rounded-xl font-sans">H</div>
                        MEDICORE
                    </div>
                    <nav className="space-y-4">
                        <button 
                            onClick={() => setView('browse')} 
                            className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${view === 'browse' ? 'bg-blue-600 shadow-lg' : 'hover:bg-slate-800 text-slate-400'}`}
                        >
                            <Activity size={20} /> <span className="font-bold">Browse Doctors</span>
                        </button>
                        <button 
                            onClick={() => setView('my-appointments')} 
                            className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${view === 'my-appointments' ? 'bg-blue-600 shadow-lg' : 'hover:bg-slate-800 text-slate-400'}`}
                        >
                            <Calendar size={20} /> <span className="font-bold">My Appointments</span>
                        </button>
                    </nav>
                </div>
                <button onClick={() => { localStorage.clear(); navigate('/login'); }} className="flex items-center gap-4 p-4 text-red-400 hover:bg-red-400/10 rounded-2xl font-bold transition">
                    <LogOut size={20} /> Logout
                </button>
            </div>

            {/* Main Section */}
            <div className="flex-1 p-10">
                <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end">
                    <div>
                        <h1 className="text-4xl font-black">{view === 'browse' ? 'Available Specialists' : 'My Booked Slots'}</h1>
                        <p className="text-slate-400 font-bold mt-1 text-sm">PATIENT PORTAL | {user.name.toUpperCase()}</p>
                    </div>
                    
                    {view === 'browse' && (
                        <div className="relative mt-4 md:mt-0">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input 
                                type="text" 
                                placeholder="Search by name or specialty..."
                                className="bg-white border-2 border-slate-200 p-4 pl-12 rounded-2xl w-80 outline-none focus:border-blue-500 shadow-sm"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    )}
                </header>

                {view === 'browse' ? (
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                        {filteredDoctors.length > 0 ? (
                            filteredDoctors.map(doc => (
                                <div key={doc.email} className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-md transition-all">
                                    <div className="flex gap-4 mb-6">
                                        <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center font-black text-xl border border-blue-100">
                                            {doc.name?.charAt(0)}
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-black text-slate-800">Dr. {doc.name}</h3>
                                            <p className="text-blue-600 text-xs font-black uppercase tracking-widest">{doc.specialization}</p>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                            <Clock size={12}/> Select a Time Slot
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {doc.availableSlots?.length > 0 ? (
                                                doc.availableSlots.map(slot => (
                                                    <button 
                                                        key={slot} 
                                                        onClick={() => handleBooking(doc, slot)}
                                                        className="px-4 py-2 bg-slate-50 hover:bg-blue-600 hover:text-white rounded-lg font-bold text-slate-600 text-sm border border-slate-100 transition-all"
                                                    >
                                                        {slot}
                                                    </button>
                                                ))
                                            ) : (
                                                <div className="w-full bg-red-50 p-3 rounded-xl flex items-center gap-2 text-red-600">
                                                    <AlertCircle size={16} />
                                                    <span className="text-xs font-black uppercase italic">No Available Slots</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full py-20 text-center bg-white rounded-[2rem] border-2 border-dashed border-slate-200">
                                <p className="text-slate-400 font-bold italic">No doctors found matching your search.</p>
                            </div>
                        )}
                    </div>
                ) : (
                    /* My Appointments View */
                    <div className="max-w-3xl space-y-4">
                        {myAppointments.length > 0 ? (
                            myAppointments.map(app => (
                                <div key={app.id} className="bg-white p-5 rounded-2xl border-2 border-slate-100 flex justify-between items-center shadow-sm">
                                    <div className="flex items-center gap-4">
                                        <div className="bg-green-100 p-3 rounded-xl text-green-600"><CheckCircle size={20}/></div>
                                        <div>
                                            <h4 className="font-black text-slate-800">Dr. {app.doctorName}</h4>
                                            <p className="text-slate-500 text-xs font-bold tracking-tight">Time: {app.slot} | Status: {app.status}</p>
                                        </div>
                                    </div>
                                    <span className="text-[10px] font-black bg-blue-50 text-blue-600 px-3 py-1 rounded-full uppercase italic">Confirmed</span>
                                </div>
                            ))
                        ) : (
                            <div className="py-20 text-center">
                                <p className="text-slate-400 font-bold italic">You haven't booked any appointments yet.</p>
                                <button onClick={() => setView('browse')} className="text-blue-600 font-black mt-2 underline">Book Now</button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PatientDashboard;