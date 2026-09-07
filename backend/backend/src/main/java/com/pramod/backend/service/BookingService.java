package com.pramod.backend.service;

import com.pramod.backend.dto.BookingRequestDTO;
import com.pramod.backend.dto.BookingResponseDTO;
import com.pramod.backend.entity.Booking;
import com.pramod.backend.entity.BookingStatus;
import com.pramod.backend.repository.BookingRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;

    public BookingService(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    // CREATE BOOKING
    public BookingResponseDTO createBooking(
            BookingRequestDTO requestDTO
    ) {

        Booking booking = new Booking();

        booking.setCustomerName(requestDTO.getCustomerName());
        booking.setPhoneNumber(requestDTO.getPhoneNumber());
        booking.setServiceType(requestDTO.getServiceType());
        booking.setAddress(requestDTO.getAddress());
        booking.setProblemDescription(requestDTO.getProblemDescription());

        // Every new booking starts as PENDING
        booking.setStatus(BookingStatus.PENDING);

        Booking savedBooking =
                bookingRepository.save(booking);

        return convertToResponseDTO(savedBooking);
    }

    // GET ALL BOOKINGS
    public List<BookingResponseDTO> getAllBookings() {

        return bookingRepository
                .findAll()
                .stream()
                .map(this::convertToResponseDTO)
                .toList();
    }

    // GET BOOKING BY ID
    public BookingResponseDTO getBookingById(Long id) {

        Booking booking = bookingRepository
                .findById(id)
                .orElseThrow(
                        () -> new RuntimeException(
                                "Booking not found with id: " + id
                        )
                );

        return convertToResponseDTO(booking);
    }

    // UPDATE BOOKING STATUS
    public BookingResponseDTO updateBookingStatus(
            Long id,
            BookingStatus status
    ) {

        Booking booking = bookingRepository
                .findById(id)
                .orElseThrow(
                        () -> new RuntimeException(
                                "Booking not found with id: " + id
                        )
                );

        booking.setStatus(status);

        Booking updatedBooking =
                bookingRepository.save(booking);

        return convertToResponseDTO(updatedBooking);
    }

    // DELETE BOOKING
    public void deleteBooking(Long id) {

        Booking booking = bookingRepository
                .findById(id)
                .orElseThrow(
                        () -> new RuntimeException(
                                "Booking not found with id: " + id
                        )
                );

        bookingRepository.delete(booking);
    }

    // ENTITY -> RESPONSE DTO
    private BookingResponseDTO convertToResponseDTO(
            Booking booking
    ) {

        return new BookingResponseDTO(
                booking.getId(),
                booking.getCustomerName(),
                booking.getPhoneNumber(),
                booking.getServiceType(),
                booking.getAddress(),
                booking.getProblemDescription(),
                booking.getStatus()
        );
    }
}