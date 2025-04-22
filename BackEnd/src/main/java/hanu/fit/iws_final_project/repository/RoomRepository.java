package hanu.fit.iws_final_project.repository;

import hanu.fit.iws_final_project.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RoomRepository extends JpaRepository<Room, Long> {
    boolean existsByRoomNumber(String roomNumber);
    @Query("SELECT r FROM Room r WHERE r.status = 'Available' "
            + "AND (:roomType IS NULL OR r.roomType = :roomType) "
            + "AND r.id NOT IN :bookedRoomIds")
    List<Room> findAvailableRoomsExcludeBooked(
            @Param("roomType") String roomType,
            @Param("bookedRoomIds") List<Long> bookedRoomIds);
    
}
