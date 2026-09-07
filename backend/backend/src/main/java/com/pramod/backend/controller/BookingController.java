package com.pramod.backend.controller;

import com.pramod.backend.dto.BookingRequestDTO;
import com.pramod.backend.dto.BookingResponseDTO;
import com.pramod.backend.entity.BookingStatus;
import com.pramod.backend.service.BookingService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "*")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    // CREATE BOOKING
    @PostMapping
    public ResponseEntity<BookingResponseDTO> createBooking(
            @Valid @RequestBody BookingRequestDTO requestDTO
    ) {

        BookingResponseDTO savedBooking =
                bookingService.createBooking(requestDTO);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(savedBooking);
    }

    // GET ALL BOOKINGS
    @GetMapping
    public ResponseEntity<List<BookingResponseDTO>> getAllBookings() {

        return ResponseEntity.ok(
                bookingService.getAllBookings()
        );
    }

    // GET BOOKING BY ID
    @GetMapping("/{id}")
    public ResponseEntity<BookingResponseDTO> getBookingById(
            @PathVariable Long id
    ) {

        return ResponseEntity.ok(
                bookingService.getBookingById(id)
        );
    }

    // UPDATE BOOKING STATUS
    @PutMapping("/{id}/status")
    public ResponseEntity<BookingResponseDTO> updateBookingStatus(
            @PathVariable Long id,
            @RequestParam BookingStatus status
    ) {

        return ResponseEntity.ok(
                bookingService.updateBookingStatus(id, status)
        );
    }

    // DELETE BOOKING
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBooking(
            @PathVariable Long id
    ) {

        bookingService.deleteBooking(id);

        return ResponseEntity.noContent().build();
    }
}