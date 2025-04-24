package hanu.fit.iws_final_project.service;

import hanu.fit.iws_final_project.dto.ReviewDto;
import hanu.fit.iws_final_project.model.ReviewModel;
import hanu.fit.iws_final_project.model.Room;
import hanu.fit.iws_final_project.model.User;
import hanu.fit.iws_final_project.model.BookingStatus;
import hanu.fit.iws_final_project.repository.ReviewRepository;
import hanu.fit.iws_final_project.repository.BookingRepository;
import hanu.fit.iws_final_project.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
@Service
public class ReviewService {

    @Autowired
    private BookingRepository bookingRepo;

    @Autowired
    private ReviewRepository reviewRepo;
    @Autowired
    private UserRepository userRepository;

    public ReviewModel saveReview(ReviewDto dto) {
        boolean isCheckedOut = bookingRepo.existsByUserIdAndRoomIdAndStatus(
                dto.getUserId(), dto.getRoomId(), BookingStatus.CHECKED_OUT
        );

        if (!isCheckedOut) {
            throw new RuntimeException("You can only review rooms you've stayed in.");
        }
        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        ReviewModel review = new ReviewModel();
        review.setRating(dto.getRating());
        review.setComment(dto.getComment());
        review.setCreatedAt(LocalDateTime.now());

        Room room = new Room();
        room.setId(dto.getRoomId());
        review.setRoom(room);

        review.setCustomerID(dto.getUserId());
        review.setCustomerName(user.getFullName());

        return reviewRepo.save(review);
    }

    public List<ReviewModel> getReviewsByRoom(Long roomId) {
        return reviewRepo.findByRoomIdOrderByCreatedAtDesc(roomId);
    }

    public Double getAverageRating(Long roomId) {
        return reviewRepo.getAverageRatingForRoom(roomId);
    }
}

