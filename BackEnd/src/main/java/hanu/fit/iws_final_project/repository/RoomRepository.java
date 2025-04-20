package hanu.fit.iws_final_project.repository;

import hanu.fit.iws_final_project.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoomRepository extends JpaRepository<Room, Long> {
    boolean existsByRoomNumber(String roomNumber);

}
