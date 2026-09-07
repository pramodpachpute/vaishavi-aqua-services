package com.pramod.backend.service;

import com.pramod.backend.dto.ServiceRequestDTO;
import com.pramod.backend.dto.ServiceResponseDTO;
import com.pramod.backend.entity.Service;
import com.pramod.backend.repository.ServiceRepository;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@org.springframework.stereotype.Service
public class ServiceService {

    private final ServiceRepository serviceRepository;

    public ServiceService(ServiceRepository serviceRepository) {
        this.serviceRepository = serviceRepository;
    }

    // ================= CREATE SERVICE =================

    public ServiceResponseDTO createService(
            ServiceRequestDTO requestDTO,
            MultipartFile image
    ) throws IOException {

        Service service = new Service();

        service.setServiceName(requestDTO.getServiceName());
        service.setDescription(requestDTO.getDescription());

        if (image != null && !image.isEmpty()) {
            service.setImageData(image.getBytes());
            service.setImageType(image.getContentType());
            service.setImageName(image.getOriginalFilename());
        }

        Service savedService =
                serviceRepository.save(service);

        return convertToResponseDTO(savedService);
    }

    // ================= GET ALL SERVICES =================

    public List<ServiceResponseDTO> getAllServices() {

        return serviceRepository
                .findAll()
                .stream()
                .map(this::convertToResponseDTO)
                .toList();
    }

    // ================= GET SERVICE BY ID =================

    public ServiceResponseDTO getServiceById(Long id) {

        Service service =
                serviceRepository
                        .findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Service not found with id: " + id
                                )
                        );

        return convertToResponseDTO(service);
    }

    // ================= GET SERVICE ENTITY =================
    // Used when returning the actual image

    public Service getServiceEntityById(Long id) {

        return serviceRepository
                .findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Service not found with id: " + id
                        )
                );
    }

    // ================= UPDATE SERVICE =================

    public ServiceResponseDTO updateService(
            Long id,
            ServiceRequestDTO requestDTO,
            MultipartFile image
    ) throws IOException {

        Service service =
                serviceRepository
                        .findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Service not found with id: " + id
                                )
                        );

        service.setServiceName(
                requestDTO.getServiceName()
        );

        service.setDescription(
                requestDTO.getDescription()
        );

        // Replace image only when a new image is uploaded
        if (image != null && !image.isEmpty()) {

            service.setImageData(
                    image.getBytes()
            );

            service.setImageType(
                    image.getContentType()
            );

            service.setImageName(
                    image.getOriginalFilename()
            );
        }

        Service updatedService =
                serviceRepository.save(service);

        return convertToResponseDTO(updatedService);
    }

    // ================= DELETE SERVICE =================

    public void deleteService(Long id) {

        Service service =
                serviceRepository
                        .findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Service not found with id: " + id
                                )
                        );

        serviceRepository.delete(service);
    }

    // ================= CONVERT TO RESPONSE DTO =================

    private ServiceResponseDTO convertToResponseDTO(
            Service service
    ) {

        String imageUrl = null;

        if (
                service.getImageData() != null &&
                        service.getImageData().length > 0
        ) {

            imageUrl =
                    "/api/services/" +
                            service.getId() +
                            "/image";
        }

        return new ServiceResponseDTO(
                service.getId(),
                service.getServiceName(),
                service.getDescription(),
                imageUrl
        );
    }
}