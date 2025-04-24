//package hanu.fit.iws_final_project.controller;
//
//import hanu.fit.iws_final_project.model.RoomImage;
//import hanu.fit.iws_final_project.repository.RoomImageRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.core.io.Resource;
//import org.springframework.core.io.UrlResource;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.MediaType;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//import org.springframework.web.server.ResponseStatusException;
//
//import java.io.IOException;
//import java.net.MalformedURLException;
//import java.nio.file.Files;
//import java.nio.file.Path;
//import java.nio.file.Paths;
//import java.util.Optional;
//
//
//@RestController
//@RequestMapping("/api/room/image")
//public class ImageController {
//
//    @Autowired
//    private RoomImageRepository roomImageRepository;
//
//    @GetMapping("/{id}")
//    public ResponseEntity<byte[]> getImage(@PathVariable Long id) {
//        Optional<RoomImage> imageOptional = roomImageRepository.findById(id);
//        if (imageOptional.isEmpty()) {
//            return ResponseEntity.notFound().build();
//        }
//
//        RoomImage image = imageOptional.get();
//        return ResponseEntity.ok()
//                .contentType(MediaType.IMAGE_JPEG)
//                .body(image.getImageData());
//    }
//}
