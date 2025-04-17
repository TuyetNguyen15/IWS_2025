package hanu.fit.iws_final_project.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table(name = "room_image")
public class RoomImage {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @Column(name = "image_url", columnDefinition = "TEXT")
        private String imageUrl;

        @ManyToOne
        @JoinColumn(name = "room_id")
        @JsonBackReference
        private Room room;
        public RoomImage() {}


        public byte[] getImageData() {
                return imageUrl.getBytes();
        }
}


