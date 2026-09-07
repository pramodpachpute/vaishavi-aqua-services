package com.pramod.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "products")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String productName;

    private String brand;

    @Column(length = 2000)
    private String description;

    @Column(length = 2000)
    private String features;

    // Actual image stored directly in Aiven MySQL
    @Lob
    @Column(name = "image_data", columnDefinition = "LONGBLOB")
    private byte[] imageData;

    // Example: image/jpeg, image/png, image/webp
    @Column(name = "image_type")
    private String imageType;

    // Original uploaded file name
    @Column(name = "image_name")
    private String imageName;
}