package com.pramod.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ServiceResponseDTO {

    private Long id;

    private String serviceName;

    private String description;

    private String imageUrl;
}