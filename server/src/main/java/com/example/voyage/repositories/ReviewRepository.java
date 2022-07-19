package com.example.voyage.repositories;

import com.example.voyage.entities.Logement;
import com.example.voyage.entities.Review;
import com.example.voyage.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    Review findReviewByUserAndLogement(User user, Logement logement);
}
