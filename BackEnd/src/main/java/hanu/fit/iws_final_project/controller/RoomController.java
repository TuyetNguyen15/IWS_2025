package hanu.fit.iws_final_project.controller;

import hanu.fit.iws_final_project.model.Room;
import hanu.fit.iws_final_project.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class RoomController {
    @Autowired
    private RoomRepository roomRepository;
    @GetMapping("/home")
    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }
}
