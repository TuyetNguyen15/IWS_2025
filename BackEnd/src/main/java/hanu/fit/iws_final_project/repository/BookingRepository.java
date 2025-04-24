// --- BookingRepository.java ---
package hanu.fit.iws_final_project.repository;

import hanu.fit.iws_final_project.model.Booking;
import hanu.fit.iws_final_project.model.BookingStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByUserId(Long userId);

    @Query("SELECT b.roomId FROM Booking b WHERE "
            + "(b.status = 'PENDING' OR b.status = 'ACCEPTED') "
            + "AND (b.checkInDate < :checkOutDate AND b.checkOutDate > :checkInDate)")
    List<Long> findBookedRoomIdsByDateOverlap(
            @Param("checkInDate") LocalDate checkInDate,
            @Param("checkOutDate") LocalDate checkOutDate);

    boolean existsByUserIdAndRoomIdAndStatus(Long userId, Long roomId, BookingStatus status);
}