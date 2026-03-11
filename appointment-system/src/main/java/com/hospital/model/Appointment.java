package com.hospital.model;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "appointments")
public class Appointment {
    @Id
    private String id;
    private String patientId;
    private String doctorId;
    private String appointmentDate;
    private String startTime;
    private String endTime;
    private String status; 
    private LocalDateTime createdAt = LocalDateTime.now();
}