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

    public User updateDoctorSlots(String email, List<String> slots) {
       
        User doctor = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Doctor not found"));
        
        doctor.setAvailableSlots(slots);
        return userRepository.save(doctor);
    }
}