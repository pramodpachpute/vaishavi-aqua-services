package com.pramod.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "services")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Service {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String serviceName;

    @Column(length = 2000)
    private String description;

    // Actual image stored directly in Aiven MySQL
    @Lob
    @Column(name = "image_data", columnDefinition = "LONGBLOB")
    private byte[] imageData;

    // Example: image/jpeg, image/png, image/webp
    @Column(name = "image_type")
    private String imageType;

    // Original uploaded image name
    @Column(name = "image_name")
    private String imageName;
}