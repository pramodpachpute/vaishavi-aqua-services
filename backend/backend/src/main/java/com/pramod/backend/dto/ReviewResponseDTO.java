package com.pramod.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
public class ReviewResponseDTO {

    private Long id;
    private String customerName;
    private String serviceName;
    private Integer rating;
    private String reviewText;
    private LocalDateTime createdAt;
}