package com.hospital.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.hospital.model.Appointment;
import com.hospital.model.User;
import com.hospital.repository.AppointmentRepository;
import com.hospital.repository.UserRepository;

@Service
public class AppointmentService {
    private final AppointmentRepository appointmentRepository;
    private final UserRepository userRepository;

    public AppointmentService(AppointmentRepository appointmentRepository, UserRepository userRepository) {
        this.appointmentRepository = appointmentRepository;
        this.userRepository = userRepository;
    }

    public Appointment bookAppointment(Appointment app) {
        
        User doctor = userRepository.findById(app.getDoctorId()).orElseThrow();
        boolean slotExists = doctor.getAvailableSlots().stream()
            .anyMatch(s -> s.getDate().equals(app.getAppointmentDate()) && 
                           s.getStartTime().equals(app.getStartTime()) && !s.isBooked());
        
        if (!slotExists) throw new RuntimeException("Doctor is not available at this time.");

    
        List<Appointment> existing = appointmentRepository.findByDoctorId(app.getDoctorId());
        boolean overlap = existing.stream().anyMatch(e -> 
            e.getAppointmentDate().equals(app.getAppointmentDate()) &&
            app.getStartTime().compareTo(e.getEndTime()) < 0 &&
            e.getStartTime().compareTo(app.getEndTime()) < 0
        );

        if (overlap) throw new RuntimeException("Time slot overlaps with an existing appointment.");

        doctor.getAvailableSlots().stream()
            .filter(s -> s.getStartTime().equals(app.getStartTime())).forEach(s -> s.setBooked(true));
        userRepository.save(doctor);
        
        app.setStatus("BOOKED");
        return appointmentRepository.save(app);
    }
}