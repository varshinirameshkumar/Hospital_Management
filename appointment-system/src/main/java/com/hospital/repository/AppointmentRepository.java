package com.hospital.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.hospital.model.Appointment;

public interface AppointmentRepository extends MongoRepository<Appointment, String> {
    List<Appointment> findByPatientEmail(String email);
    List<Appointment> findByDoctorEmail(String email);
}