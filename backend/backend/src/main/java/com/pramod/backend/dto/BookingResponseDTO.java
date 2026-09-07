package com.pramod.backend.dto;

import com.pramod.backend.entity.BookingStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class BookingResponseDTO {

    private Long id;
    private String customerName;
    private String phoneNumber;
    private String serviceType;
    private String address;
    private String problemDescription;
    private BookingStatus status;
}