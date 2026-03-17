package com.hospital.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;
@Document(collection = "appointments")
@Data
public class Appointment {
    @Id
    private String id;
    private String patientEmail;
    private String doctorEmail;
    private String doctorName;
    private String slot;
    private String status; 

    public Object getSlotTime() {
        throw new UnsupportedOperationException("Not supported yet.");
    }
}