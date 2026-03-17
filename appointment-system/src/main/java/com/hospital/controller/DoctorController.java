package com.hospital.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hospital.model.User;
import com.hospital.service.UserService;

@RestController
@RequestMapping("/api/doctors")
@CrossOrigin("*")
public class DoctorController {
    private final UserService userService;

    public DoctorController(UserService userService) {
        this.userService = userService;
    }

    @PutMapping("/{email}/slots")
    public User setSlots(@PathVariable String email, @RequestBody List<String> slots) {
        return userService.updateDoctorSlots(email, slots);
    }
}