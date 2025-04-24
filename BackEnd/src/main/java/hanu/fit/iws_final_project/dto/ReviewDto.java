package hanu.fit.iws_final_project.dto;


import lombok.Data;
// @Data = @Getter + @Setter + @ToString + @EqualsAndHashCode + @RequiredArgsConstructor
@Data
    public class ReviewDto {
    private Long userId;
    private String customerName;
    private Long roomId;
        private int rating;
        private String comment;
    }


