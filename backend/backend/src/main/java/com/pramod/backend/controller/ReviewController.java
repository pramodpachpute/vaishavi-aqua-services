package com.pramod.backend.controller;

import com.pramod.backend.dto.ReviewRequestDTO;
import com.pramod.backend.dto.ReviewResponseDTO;
import com.pramod.backend.service.ReviewService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@CrossOrigin(origins = "*")
public class ReviewController {

    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    // CREATE REVIEW
    @PostMapping
    public ResponseEntity<ReviewResponseDTO> createReview(
            @Valid @RequestBody ReviewRequestDTO requestDTO
    ) {
        ReviewResponseDTO savedReview =
                reviewService.createReview(requestDTO);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(savedReview);
    }

    // GET ALL REVIEWS
    @GetMapping
    public ResponseEntity<List<ReviewResponseDTO>> getAllReviews() {
        return ResponseEntity.ok(reviewService.getAllReviews());
    }

    // DELETE REVIEW
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReview(
            @PathVariable Long id
    ) {
        reviewService.deleteReview(id);
        return ResponseEntity.noContent().build();
    }
}