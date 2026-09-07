package com.pramod.backend.controller;

import com.pramod.backend.dto.ServiceRequestDTO;
import com.pramod.backend.dto.ServiceResponseDTO;
import com.pramod.backend.entity.Service;
import com.pramod.backend.service.ServiceService;
import jakarta.validation.Valid;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/services")
@CrossOrigin(origins = "*")
public class ServiceController {

    private final ServiceService serviceService;

    public ServiceController(ServiceService serviceService) {
        this.serviceService = serviceService;
    }

    // ================= CREATE SERVICE =================

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ServiceResponseDTO> createService(
            @Valid @RequestPart("service") ServiceRequestDTO requestDTO,
            @RequestPart(value = "image", required = false) MultipartFile image
    ) throws IOException {

        ServiceResponseDTO savedService =
                serviceService.createService(requestDTO, image);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(savedService);
    }

    // ================= GET ALL SERVICES =================

    @GetMapping
    public ResponseEntity<List<ServiceResponseDTO>> getAllServices() {

        return ResponseEntity.ok(
                serviceService.getAllServices()
        );
    }

    // ================= GET SERVICE BY ID =================

    @GetMapping("/{id}")
    public ResponseEntity<ServiceResponseDTO> getServiceById(
            @PathVariable Long id
    ) {

        return ResponseEntity.ok(
                serviceService.getServiceById(id)
        );
    }

    // ================= GET SERVICE IMAGE =================

    @GetMapping("/{id}/image")
    public ResponseEntity<byte[]> getServiceImage(
            @PathVariable Long id
    ) {

        Service service =
                serviceService.getServiceEntityById(id);

        byte[] imageData = service.getImageData();

        if (imageData == null || imageData.length == 0) {
            return ResponseEntity
                    .notFound()
                    .build();
        }

        String imageType = service.getImageType();

        MediaType mediaType;

        try {
            mediaType =
                    imageType != null
                            ? MediaType.parseMediaType(imageType)
                            : MediaType.APPLICATION_OCTET_STREAM;
        } catch (Exception e) {
            mediaType = MediaType.APPLICATION_OCTET_STREAM;
        }

        return ResponseEntity
                .ok()
                .contentType(mediaType)
                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "inline"
                )
                .body(imageData);
    }

    // ================= UPDATE SERVICE =================

    @PutMapping(
            value = "/{id}",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ResponseEntity<ServiceResponseDTO> updateService(
            @PathVariable Long id,
            @Valid @RequestPart("service") ServiceRequestDTO requestDTO,
            @RequestPart(value = "image", required = false) MultipartFile image
    ) throws IOException {

        return ResponseEntity.ok(
                serviceService.updateService(
                        id,
                        requestDTO,
                        image
                )
        );
    }

    // ================= DELETE SERVICE =================

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteService(
            @PathVariable Long id
    ) {

        serviceService.deleteService(id);

        return ResponseEntity
                .noContent()
                .build();
    }
}