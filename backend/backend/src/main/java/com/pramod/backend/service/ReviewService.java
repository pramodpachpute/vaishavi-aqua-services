package com.pramod.backend.service;

import com.pramod.backend.dto.ReviewRequestDTO;
import com.pramod.backend.dto.ReviewResponseDTO;
import com.pramod.backend.entity.Review;
import com.pramod.backend.repository.ReviewRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;

    public ReviewService(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    // CREATE REVIEW
    public ReviewResponseDTO createReview(ReviewRequestDTO requestDTO) {

        Review review = new Review();

        review.setCustomerName(requestDTO.getCustomerName());
        review.setServiceName(requestDTO.getServiceName());
        review.setRating(requestDTO.getRating());
        review.setReviewText(requestDTO.getReviewText());
        review.setCreatedAt(LocalDateTime.now());

        Review savedReview = reviewRepository.save(review);

        return convertToResponseDTO(savedReview);
    }

    // GET ALL REVIEWS
    public List<ReviewResponseDTO> getAllReviews() {

        return reviewRepository.findAll()
                .stream()
                .map(this::convertToResponseDTO)
                .toList();
    }

    // DELETE REVIEW
    public void deleteReview(Long id) {

        Review review = reviewRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Review not found with id: " + id)
                );

        reviewRepository.delete(review);
    }

    // ENTITY -> RESPONSE DTO
    private ReviewResponseDTO convertToResponseDTO(Review review) {

        return new ReviewResponseDTO(
                review.getId(),
                review.getCustomerName(),
                review.getServiceName(),
                review.getRating(),
                review.getReviewText(),
                review.getCreatedAt()
        );
    }
}