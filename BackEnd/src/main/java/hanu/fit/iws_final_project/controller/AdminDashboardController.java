package hanu.fit.iws_final_project.controller;

import hanu.fit.iws_final_project.model.Booking;
import hanu.fit.iws_final_project.model.BookingStatus;
import hanu.fit.iws_final_project.model.Room;
import hanu.fit.iws_final_project.repository.BookingRepository;
import hanu.fit.iws_final_project.repository.RoomRepository;
import hanu.fit.iws_final_project.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.Month;
import java.time.format.TextStyle;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin/dashboard")
public class AdminDashboardController {

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/stats")
    public ResponseEntity<?> getDashboardStats() {
        long totalRooms = roomRepository.count();

        LocalDate today = LocalDate.now();
        List<Booking> allBookings = bookingRepository.findAll();

        long bookingsToday = allBookings.stream()
                .filter(b -> b.getCreatedAt().toLocalDate().equals(today))
                .count();

        long bookedRooms = allBookings.stream()
                .filter(b -> b.getStatus() == BookingStatus.ACCEPTED || b.getStatus() == BookingStatus.CHECKED_OUT)
                .map(Booking::getRoomId)
                .distinct()
                .count();

        double occupancyRate = totalRooms > 0 ? (double) bookedRooms / totalRooms * 100 : 0;

        long totalUsers = userRepository.count();

        Map<String, Object> result = new HashMap<>();
        result.put("totalRooms", totalRooms);
        result.put("bookingsToday", bookingsToday);
        result.put("occupancyRate", occupancyRate);
        result.put("totalUsers", totalUsers);

        return ResponseEntity.ok(result);
    }

    @GetMapping("/monthly-revenue")
    public ResponseEntity<?> getMonthlyRevenue() {
        List<Booking> bookings = bookingRepository.findAll();

        Map<String, BigDecimal> monthlyRevenue = new LinkedHashMap<>();
        for (int i = 1; i <= 12; i++) {
            final int month = i;
            String monthName = Month.of(month).getDisplayName(TextStyle.SHORT, Locale.ENGLISH);

            BigDecimal total = bookings.stream()
                    .filter(b -> b.getCreatedAt().getMonthValue() == month &&
                            b.getStatus() == BookingStatus.ACCEPTED)
                    .map(b -> roomRepository.findById(b.getRoomId()).map(Room::getRoomPrice).orElse(BigDecimal.ZERO))
                    .reduce(BigDecimal.ZERO, BigDecimal::add);

            monthlyRevenue.put(monthName, total);
        }

        return ResponseEntity.ok(monthlyRevenue);
    }

    @GetMapping("/top-rooms")
    public ResponseEntity<?> getTopRooms() {
        List<Booking> bookings = bookingRepository.findAll();

        Map<Long, Long> roomBookingCounts = bookings.stream()
                .collect(Collectors.groupingBy(Booking::getRoomId, Collectors.counting()));

        List<Map<String, Object>> topRooms = roomBookingCounts.entrySet().stream()
                .sorted(Map.Entry.<Long, Long>comparingByValue().reversed())
                .limit(5)
                .map(entry -> {
                    Map<String, Object> data = new HashMap<>();
                    Room room = roomRepository.findById(entry.getKey()).orElse(null);
                    if (room != null) {
                        data.put("roomNumber", room.getRoomNumber());
                        data.put("bookings", entry.getValue());
                    }
                    return data;
                })
                .collect(Collectors.toList());

        return ResponseEntity.ok(topRooms);
    }

    @GetMapping("/monthly-bookings")
    public ResponseEntity<?> getMonthlyBookings() {
        List<Booking> bookings = bookingRepository.findAll();

        Map<String, Long> monthlyCount = new LinkedHashMap<>();
        for (int i = 1; i <= 12; i++) {
            final int month = i;
            String monthName = Month.of(month).getDisplayName(TextStyle.SHORT, Locale.ENGLISH);
            long count = bookings.stream()
                    .filter(b -> b.getCreatedAt().getMonthValue() == month)
                    .count();
            monthlyCount.put(monthName, count);
        }

        return ResponseEntity.ok(monthlyCount);
    }
}