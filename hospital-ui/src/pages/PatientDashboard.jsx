import React, { useEffect, useState } from 'react';
import api from '../api/axiosConfig';
import { User, Calendar } from 'lucide-react';

const PatientDashboard = () => {
    const [doctors, setDoctors] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const res = await api.get('/auth/doctors');
                setDoctors(res.data);
            
            } // eslint-disable-next-line no-unused-vars
            catch (err) {
                console.error("Doctors list-ah fetch panna mudila!");
            }
        };
        fetchDoctors();
    }, []);

    return (
        <div className="p-8 bg-slate-50 min-h-screen">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900">Welcome, {user?.name}</h1>
                <p className="text-slate-500">Book your appointment with our specialists.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {doctors.map((doc) => (
                    <div key={doc.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                                <User size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">{doc.name}</h3>
                                <p className="text-sm text-blue-600 font-medium uppercase">{doc.specialization}</p>
                            </div>
                        </div>
                        <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2">
                            <Calendar size={18} /> Book Appointment
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PatientDashboard;