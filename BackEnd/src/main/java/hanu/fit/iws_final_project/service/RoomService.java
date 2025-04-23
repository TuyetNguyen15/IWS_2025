package hanu.fit.iws_final_project.service;

import hanu.fit.iws_final_project.dto.RoomDto;
import hanu.fit.iws_final_project.model.Room;
import hanu.fit.iws_final_project.model.RoomImage;
import hanu.fit.iws_final_project.repository.BookingRepository;
import hanu.fit.iws_final_project.repository.RoomRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class RoomService {

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private BookingRepository bookingRepository;

    public List<Room> searchRooms(LocalDate checkIn, LocalDate checkOut, String roomType) {
        List<Long> bookedRoomIds = bookingRepository.findBookedRoomIdsByDateOverlap(checkIn, checkOut);

        if (bookedRoomIds.isEmpty()) {
            bookedRoomIds.add(-1L);
        }

        return roomRepository.findAvailableRoomsExcludeBooked(roomType, bookedRoomIds);
    }
}
