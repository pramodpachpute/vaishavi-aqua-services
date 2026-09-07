package com.pramod.backend.controller;

import com.pramod.backend.dto.ProductRequestDTO;
import com.pramod.backend.dto.ProductResponseDTO;
import com.pramod.backend.entity.Product;
import com.pramod.backend.service.ProductService;
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
@RequestMapping("/api/products")
@CrossOrigin(origins = "*")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    // ==========================================
    // CREATE PRODUCT WITH IMAGE
    // ==========================================

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ProductResponseDTO> createProduct(

            @Valid
            @RequestPart("product")
            ProductRequestDTO requestDTO,

            @RequestPart(
                    value = "image",
                    required = false
            )
            MultipartFile image

    ) throws IOException {

        ProductResponseDTO savedProduct =
                productService.createProduct(
                        requestDTO,
                        image
                );

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(savedProduct);
    }

    // ==========================================
    // GET ALL PRODUCTS
    // ==========================================

    @GetMapping
    public ResponseEntity<List<ProductResponseDTO>> getAllProducts() {

        return ResponseEntity.ok(
                productService.getAllProducts()
        );
    }

    // ==========================================
    // GET PRODUCT IMAGE
    // IMPORTANT: Keep this before /{id}
    // ==========================================

    @GetMapping("/{id}/image")
    public ResponseEntity<byte[]> getProductImage(
            @PathVariable Long id
    ) {

        Product product =
                productService.getProductEntityById(id);

        byte[] imageData = product.getImageData();

        if (imageData == null || imageData.length == 0) {
            return ResponseEntity.notFound().build();
        }

        String imageType = product.getImageType();

        MediaType mediaType;

        try {
            mediaType = imageType != null
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

    // ==========================================
    // GET PRODUCT BY ID
    // ==========================================

    @GetMapping("/{id}")
    public ResponseEntity<ProductResponseDTO> getProductById(
            @PathVariable Long id
    ) {

        return ResponseEntity.ok(
                productService.getProductById(id)
        );
    }

    // ==========================================
    // UPDATE PRODUCT + OPTIONAL NEW IMAGE
    // ==========================================

    @PutMapping(
            value = "/{id}",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ResponseEntity<ProductResponseDTO> updateProduct(

            @PathVariable Long id,

            @Valid
            @RequestPart("product")
            ProductRequestDTO requestDTO,

            @RequestPart(
                    value = "image",
                    required = false
            )
            MultipartFile image

    ) throws IOException {

        return ResponseEntity.ok(
                productService.updateProduct(
                        id,
                        requestDTO,
                        image
                )
        );
    }

    // ==========================================
    // DELETE PRODUCT
    // ==========================================

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(
            @PathVariable Long id
    ) {

        productService.deleteProduct(id);

        return ResponseEntity
                .noContent()
                .build();
    }
}