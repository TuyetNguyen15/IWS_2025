package hanu.fit.iws_final_project.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@Table(name = "room")
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Column(name = "number")
    private String roomNumber;

    @Column(name = "type")
    private String roomType;

    @Column(name = "price")
    private BigDecimal roomPrice;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private RoomStatus status;
    @Column(name = "description", columnDefinition = "Text")
    private String description;

    @Column(name = "area")
    private double roomArea;

    @Column(name = "capacity")
    private int roomCapacity;

    @Column(name = "amenities")
    private String amenities;
    @OneToMany(mappedBy = "room", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<RoomImage> images;

    public Room() {

    }
    public Room(Long id) {
        this.id = id;
    }

    public void setImages(List<RoomImage> images) {
        this.images = images;
        for (RoomImage image : images) {
            image.setRoom(this);
        }
    }


}
enum RoomStatus {
    Available, Booked
}
