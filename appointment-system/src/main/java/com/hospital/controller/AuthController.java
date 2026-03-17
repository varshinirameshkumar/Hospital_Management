package com.hospital.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hospital.model.Appointment;
import com.hospital.model.User;
import com.hospital.repository.AppointmentRepository;
import com.hospital.repository.UserRepository;
import com.hospital.service.UserService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        try {
            User savedUser = userRepository.save(user);
            return ResponseEntity.ok(savedUser);
        } 
        
        catch (Exception e) {
            return ResponseEntity.badRequest().body("Registration failed: " + e.getMessage());
        }
    }

    @GetMapping("/login")
    public ResponseEntity<?> login(@RequestParam String email) {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());
        }
        return ResponseEntity.status(404).body("User not found");
    }

    @PostMapping("/update-slots")
    public ResponseEntity<?> updateSlots(@RequestParam String email, @RequestBody List<String> slots) {
        try {
            User updatedUser = userService.updateDoctorSlots(email, slots);
            return ResponseEntity.ok(updatedUser);
        } catch (Exception e) {
            return ResponseEntity.status(404).body("Doctor not found: " + e.getMessage());
        }
    }
    @Autowired
private AppointmentRepository appointmentRepository; 
@GetMapping("/doctors")
public List<User> getDoctors() {
    return userRepository.findByRole("DOCTOR"); 
}

@PostMapping("/book-appointment")
public ResponseEntity<?> book(@RequestBody Appointment app) {
   
    appointmentRepository.save(app);
    
    
    User doctor = userRepository.findByEmail(app.getDoctorEmail()).get();
    doctor.getAvailableSlots().remove(app.getSlot());
    userRepository.save(doctor);
    
    return ResponseEntity.ok("Booked Successfully");
}

@GetMapping("/my-appointments")
public List<Appointment> getMyAppointments(@RequestParam String email) {
    return appointmentRepository.findByPatientEmail(email);
}
}