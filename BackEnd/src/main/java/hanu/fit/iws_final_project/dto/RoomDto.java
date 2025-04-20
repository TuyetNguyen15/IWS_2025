package hanu.fit.iws_final_project.dto;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
public class RoomDto {
    private String roomNumber;
    private String roomType;
    private BigDecimal roomPrice;
    private String status;
    private String description;
    private double roomArea;
    private int roomCapacity;
    private String amenities;

    private List<MultipartFile> uploadedImages; // các file ảnh upload
    private List<String> imageUrls;              // các link ảnh từ Internet
}
