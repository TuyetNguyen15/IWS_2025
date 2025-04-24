package hanu.fit.iws_final_project.repository;


import hanu.fit.iws_final_project.model.ReviewModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ReviewRepository extends JpaRepository<ReviewModel, Long> {
        List<ReviewModel> findByRoomIdOrderByCreatedAtDesc(Long roomId);

        @Query("SELECT AVG(r.rating) FROM ReviewModel r WHERE r.room.id = :roomId")
        Double getAverageRatingForRoom(@Param("roomId") Long roomId);
    }


