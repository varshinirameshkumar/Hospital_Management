package com.hospital.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DoctorReportDTO {
    private String doctorName;
    private long appointmentCount;
    private double revenue;
}