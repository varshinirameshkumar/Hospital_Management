package com.hospital.model;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data 
@Document(collection = "users")
public class User {
    @Id
    private String id;
    private String name;
    private String email;
    private String role; 
    private String specialization;
    
    private List<String> availableSlots = new ArrayList<>(); 
}