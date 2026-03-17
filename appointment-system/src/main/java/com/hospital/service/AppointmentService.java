package com.hospital.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hospital.model.Appointment;
import com.hospital.model.User;
import com.hospital.repository.AppointmentRepository;
import com.hospital.repository.UserRepository;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private UserRepository userRepository;

    public Appointment bookAppointment(Appointment app) {
        Optional<User> doctorOpt = userRepository.findByEmail(app.getDoctorEmail());
        
        if (doctorOpt.isEmpty()) {
            throw new RuntimeException("Doctor not found.");
        }

        User doctor = doctorOpt.get();
        boolean isSlotAvailable = doctor.getAvailableSlots().contains(app.getSlotTime());

        if (!isSlotAvailable) {
            throw new RuntimeException("This time slot is no longer available.");
        }

        doctor.getAvailableSlots().remove(app.getSlotTime());
        userRepository.save(doctor);

        app.setStatus("CONFIRMED");
        return appointmentRepository.save(app);
    }

    public List<Appointment> getAppointmentsByPatient(String email) {
        return appointmentRepository.findByPatientEmail(email);
    }

    public List<Appointment> getAppointmentsByDoctor(String email) {
        return appointmentRepository.findByDoctorEmail(email);
    }
}