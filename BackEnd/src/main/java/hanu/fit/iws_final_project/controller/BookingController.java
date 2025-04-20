// --- BookingController.java ---
package hanu.fit.iws_final_project.controller;

import hanu.fit.iws_final_project.model.Booking;
import hanu.fit.iws_final_project.model.BookingStatus;
import hanu.fit.iws_final_project.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class BookingController {

    @Autowired
    private BookingRepository bookingRepository;

    @PostMapping("/bookings")
    public ResponseEntity<Booking> createBooking(@RequestBody Booking booking) {
        booking.setStatus(BookingStatus.PENDING);
        booking.setCreatedAt(LocalDateTime.now());
        Booking saved = bookingRepository.save(booking);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/customer/bookings")
    public ResponseEntity<List<Booking>> getCustomerBookings(@RequestParam String email) {
        List<Booking> bookings = bookingRepository.findByCustomerEmail(email);
        return ResponseEntity.ok(bookings);
    }

    @PutMapping("/customer/bookings/{id}/cancel")
    public ResponseEntity<Booking> cancelBooking(@PathVariable Long id) {
        Optional<Booking> optionalBooking = bookingRepository.findById(id);
        if (optionalBooking.isEmpty()) return ResponseEntity.notFound().build();

        Booking booking = optionalBooking.get();
        booking.setStatus(BookingStatus.CANCELLED);
        bookingRepository.save(booking);
        return ResponseEntity.ok(booking);
    }

    @DeleteMapping("/customer/bookings/{id}")
    public ResponseEntity<Void> deleteCustomerBooking(@PathVariable Long id) {
        if (!bookingRepository.existsById(id)) return ResponseEntity.notFound().build();
        bookingRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/admin/bookings")
    public ResponseEntity<List<Booking>> getAllBookings() {
        List<Booking> bookings = bookingRepository.findAll();
        return ResponseEntity.ok(bookings);
    }

    @PutMapping("/admin/bookings/{id}")
    public ResponseEntity<Booking> updateBooking(@PathVariable Long id, @RequestBody Booking updatedBooking) {
        Optional<Booking> optionalBooking = bookingRepository.findById(id);
        if (optionalBooking.isEmpty()) return ResponseEntity.notFound().build();

        Booking booking = optionalBooking.get();
        booking.setCheckInDate(updatedBooking.getCheckInDate());
        booking.setCheckOutDate(updatedBooking.getCheckOutDate());
        booking.setRoomId(updatedBooking.getRoomId());
        bookingRepository.save(booking);
        return ResponseEntity.ok(booking);
    }

    @PutMapping("/admin/bookings/{id}/status")
    public ResponseEntity<Booking> updateBookingStatus(@PathVariable Long id, @RequestParam BookingStatus status) {
        Optional<Booking> optionalBooking = bookingRepository.findById(id);
        if (optionalBooking.isEmpty()) return ResponseEntity.notFound().build();

        Booking booking = optionalBooking.get();
        booking.setStatus(status);
        bookingRepository.save(booking);
        return ResponseEntity.ok(booking);
    }

    @DeleteMapping("/admin/bookings/{id}")
    public ResponseEntity<Void> deleteAdminBooking(@PathVariable Long id) {
        if (!bookingRepository.existsById(id)) return ResponseEntity.notFound().build();
        bookingRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}