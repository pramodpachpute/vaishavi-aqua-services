package com.pramod.backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ServiceRequestDTO {

    @NotBlank(message = "Service name is required")
    private String serviceName;

    private String description;
}