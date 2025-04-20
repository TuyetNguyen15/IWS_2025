// --- BookingRepository.java ---
package hanu.fit.iws_final_project.repository;

import hanu.fit.iws_final_project.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByCustomerEmail(String email);
}
