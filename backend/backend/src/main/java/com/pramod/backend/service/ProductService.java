package com.pramod.backend.service;

import com.pramod.backend.dto.ProductRequestDTO;
import com.pramod.backend.dto.ProductResponseDTO;
import com.pramod.backend.entity.Product;
import com.pramod.backend.repository.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    // CREATE PRODUCT
    public ProductResponseDTO createProduct(
            ProductRequestDTO requestDTO,
            MultipartFile image
    ) throws IOException {

        Product product = new Product();

        product.setProductName(requestDTO.getProductName());
        product.setBrand(requestDTO.getBrand());
        product.setDescription(requestDTO.getDescription());
        product.setFeatures(requestDTO.getFeatures());

        // Store actual image inside Aiven MySQL
        if (image != null && !image.isEmpty()) {
            product.setImageData(image.getBytes());
            product.setImageType(image.getContentType());
            product.setImageName(image.getOriginalFilename());
        }

        Product savedProduct = productRepository.save(product);

        return convertToResponseDTO(savedProduct);
    }

    // GET ALL PRODUCTS
    public List<ProductResponseDTO> getAllProducts() {

        return productRepository.findAll()
                .stream()
                .map(this::convertToResponseDTO)
                .toList();
    }

    // GET PRODUCT BY ID
    public ProductResponseDTO getProductById(Long id) {

        Product product = productRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Product not found with id: " + id
                        )
                );

        return convertToResponseDTO(product);
    }

    // GET PRODUCT ENTITY FOR IMAGE
    public Product getProductEntityById(Long id) {

        return productRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Product not found with id: " + id
                        )
                );
    }

    // UPDATE PRODUCT
    public ProductResponseDTO updateProduct(
            Long id,
            ProductRequestDTO requestDTO,
            MultipartFile image
    ) throws IOException {

        Product product = productRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Product not found with id: " + id
                        )
                );

        product.setProductName(requestDTO.getProductName());
        product.setBrand(requestDTO.getBrand());
        product.setDescription(requestDTO.getDescription());
        product.setFeatures(requestDTO.getFeatures());

        // Replace image only when a new image is uploaded.
        // If no new image is selected, keep the old image.
        if (image != null && !image.isEmpty()) {
            product.setImageData(image.getBytes());
            product.setImageType(image.getContentType());
            product.setImageName(image.getOriginalFilename());
        }

        Product updatedProduct = productRepository.save(product);

        return convertToResponseDTO(updatedProduct);
    }

    // DELETE PRODUCT
    public void deleteProduct(Long id) {

        Product product = productRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Product not found with id: " + id
                        )
                );

        productRepository.delete(product);
    }

    // ENTITY -> RESPONSE DTO
    private ProductResponseDTO convertToResponseDTO(Product product) {

        String imageUrl = null;

        if (product.getImageData() != null &&
                product.getImageData().length > 0) {

            imageUrl = "/api/products/"
                    + product.getId()
                    + "/image";
        }

        return new ProductResponseDTO(
                product.getId(),
                product.getProductName(),
                product.getBrand(),
                product.getDescription(),
                product.getFeatures(),
                imageUrl
        );
    }
}