package com.pramod.backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductRequestDTO {

    @NotBlank(message = "Product name is required")
    private String productName;

    private String brand;

    private String description;

    private String features;
}