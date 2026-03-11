package com.hospital.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.hospital.model.User;
import com.hospital.repository.UserRepository;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User registerUser(User user) {
        return userRepository.save(user);
    }

    public User updateDoctorSlots(String doctorId, List<com.hospital.model.Slot> slots) {
        User doctor = userRepository.findById(doctorId).orElseThrow();
        doctor.setAvailableSlots(slots);
        return userRepository.save(doctor);
    }
}