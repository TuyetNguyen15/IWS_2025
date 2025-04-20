//package hanu.fit.iws_final_project.service;
//
//import hanu.fit.iws_final_project.dto.RoomDto;
//import hanu.fit.iws_final_project.model.Room;
//import hanu.fit.iws_final_project.model.RoomImage;
//import hanu.fit.iws_final_project.repository.RoomRepository;
//import jakarta.transaction.Transactional;
//import org.springframework.stereotype.Service;
//import org.springframework.web.multipart.MultipartFile;
//
//import java.io.IOException;
//import java.util.ArrayList;
//import java.util.List;
//
//@Service
//public class RoomService {
//
//    private final RoomRepository roomRepository;
//
//    public RoomService(RoomRepository roomRepository) {
//        this.roomRepository = roomRepository;
//    }
//
//    @Transactional
//    public Room createRoom(RoomDto request) throws IOException {
//        Room room = new Room();
//        room.setRoomNumber(request.getRoomNumber());
//        room.setRoomType(request.getRoomType());
//        room.setRoomPrice(request.getRoomPrice());
//        room.setStatus(Room.RoomStatus.valueOf(request.getStatus())); // Sửa chỗ này
//        room.setDescription(request.getDescription());
//        room.setRoomArea(request.getRoomArea());
//        room.setRoomCapacity(request.getRoomCapacity());
//        room.setAmenities(request.getAmenities());
//
//        List<RoomImage> images = new ArrayList<>();
//
//        // Xử lý ảnh từ file upload
//        if (request.getUploadedImages() != null) {
//            for (MultipartFile file : request.getUploadedImages()) {
//                if (!file.isEmpty()) {
//                    RoomImage img = new RoomImage();
//                    img.setImageData(file.getBytes());
//                    img.setRoom(room); // gán phòng cho ảnh
//                    images.add(img);
//                }
//            }
//        }
//
//        // Xử lý ảnh từ link
//        if (request.getImageUrls() != null) {
//            for (String url : request.getImageUrls()) {
//                if (url != null && !url.trim().isEmpty()) {
//                    RoomImage img = new RoomImage();
//                    img.setImageUrl(url);
//                    img.setRoom(room);
//                    images.add(img);
//                }
//            }
//        }
//
//        room.setImages(images);
//
//        return roomRepository.save(room);
//    }
//}
