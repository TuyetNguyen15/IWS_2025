package hanu.fit.iws_final_project.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import hanu.fit.iws_final_project.model.Room;
import hanu.fit.iws_final_project.model.RoomImage;
import hanu.fit.iws_final_project.repository.RoomRepository;
import hanu.fit.iws_final_project.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class RoomController {
    @Autowired
    private RoomRepository roomRepository;
    @Autowired
    private ObjectMapper objectMapper;
    @Autowired
    private RoomService roomService;


    @GetMapping("/rooms")
    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    @GetMapping("/rooms/{id}")
    public ResponseEntity<Room> getRoomById(@PathVariable Long id) {
        Optional<Room> roomOptional = roomRepository.findById(id);
        if (roomOptional.isPresent()) {
            return ResponseEntity.ok(roomOptional.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/rooms/search")
    public List<Room> searchRooms(
            @RequestParam LocalDate checkInDate,
            @RequestParam LocalDate checkOutDate,
            @RequestParam(required = false) String roomType
    ) {
        return roomService.searchRooms(checkInDate, checkOutDate, roomType);
    }
    @PostMapping(value = "/rooms", consumes = {"multipart/form-data"})
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Room> createRoomWithImages(
            @RequestPart("room") String roomJson,
            @RequestPart(value = "images", required = false) List<MultipartFile> images
    ) throws IOException {
        Room room = objectMapper.readValue(roomJson, Room.class);

        if (images != null && !images.isEmpty()) {
            List<RoomImage> roomImages = new ArrayList<>();
            for (MultipartFile file : images) {
                RoomImage img = new RoomImage();
                img.setImageData(file.getBytes());
                img.setImageUrl(file.getOriginalFilename());
                img.setRoom(room);
                roomImages.add(img);
            }
            room.setImages(roomImages);
        }

        Room savedRoom = roomRepository.save(room);
        return ResponseEntity.ok(savedRoom);
    }

    @GetMapping("/rooms/checkRoomNumber")
    public ResponseEntity<Boolean> checkRoomNumberExists(@RequestParam String roomNumber) {
        boolean exists = roomRepository.existsByRoomNumber(roomNumber);
        return ResponseEntity.ok(exists);
    }


@PutMapping(value = "/rooms/{id}", consumes = {"multipart/form-data"})
@PreAuthorize("hasRole('ADMIN')")
public ResponseEntity<Room> updateRoomWithImages(
        @PathVariable Long id,
        @RequestPart("room") String roomJson,
        @RequestPart(value = "images", required = false) List<MultipartFile> images,
        @RequestParam(value = "keepImageIds", required = false) List<Long> keepImageIds
) throws IOException {
    Optional<Room> optionalRoom = roomRepository.findById(id);
    if (!optionalRoom.isPresent()) {
        return ResponseEntity.notFound().build();
    }

    Room room = optionalRoom.get();
    Room updatedRoomData = objectMapper.readValue(roomJson, Room.class);
    room.setRoomNumber(updatedRoomData.getRoomNumber());
    room.setRoomType(updatedRoomData.getRoomType());
    room.setRoomPrice(updatedRoomData.getRoomPrice());
    room.setStatus(updatedRoomData.getStatus());
    room.setDescription(updatedRoomData.getDescription());
    room.setRoomArea(updatedRoomData.getRoomArea());
    room.setRoomCapacity(updatedRoomData.getRoomCapacity());
    room.setAmenities(updatedRoomData.getAmenities());
    List<RoomImage> updatedImages = new ArrayList<>();
    if (keepImageIds != null && room.getImages() != null) {
        for (RoomImage img : room.getImages()) {
            if (keepImageIds.contains(img.getId())) {
                updatedImages.add(img);
            }
        }
    }

    if (images != null && !images.isEmpty()) {
        for (MultipartFile file : images) {
            RoomImage newImg = new RoomImage();
            newImg.setImageData(file.getBytes());
            newImg.setImageUrl(file.getOriginalFilename());
            newImg.setRoom(room);
            updatedImages.add(newImg);
        }
    }
    room.getImages().clear();
    room.getImages().addAll(updatedImages);

    Room savedRoom = roomRepository.save(room);
    return ResponseEntity.ok(savedRoom);
}
    @DeleteMapping("/rooms/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteRoom(@PathVariable Long id) {
        if (!roomRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        roomRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}