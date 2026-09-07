package com.pramod.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ProductResponseDTO {

    private Long id;
    private String productName;
    private String brand;
    private String description;
    private String features;

    private String imageUrl;
}