package com.example.voyage.controllers;

import com.example.voyage.entities.Logement;
import com.example.voyage.entities.Review;
import com.example.voyage.entities.User;
import com.example.voyage.repositories.LogementRepository;
import com.example.voyage.repositories.RefreshTokenRepository;
import com.example.voyage.repositories.ReviewRepository;
import com.example.voyage.repositories.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.time.Instant;
import java.util.List;

@RestController
@RequestMapping("/reviews")
@CrossOrigin("*")
public class ReviewController {

    private final ReviewRepository reviewRepository;
    private final LogementRepository logementRepository;
    private final UserRepository userRepository;

    public ReviewController(ReviewRepository reviewRepository, LogementRepository logementRepository, UserRepository userRepository) {
        this.reviewRepository = reviewRepository;
        this.logementRepository = logementRepository;
        this.userRepository = userRepository;
    }

    @GetMapping
    public List<Review> getReviews(){
        return reviewRepository.findAll();
    }

    @GetMapping("/{id}")
    public Review getReview(@PathVariable Long id){
        return reviewRepository.findById(id).orElseThrow(RuntimeException::new);
    }

    @GetMapping("/{userId}/{logementId}")
    public Review getReviewByUserAndLogement(@PathVariable Long userId, @PathVariable Long logementId){
        User user = userRepository.findUserById(userId);
        Logement logement = logementRepository.findById(logementId).get();
        return reviewRepository.findReviewByUserAndLogement(user,logement);
    }

    @PostMapping
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity createReview(@RequestBody Review review) throws URISyntaxException {
        review.setCreatedAt(Instant.now());
        review.setUpdatedAt(Instant.now());
        Review savedReview = reviewRepository.save(review);

        //Update Logement rating cache & rating count
        Logement logement = logementRepository.findById(review.getLogement().getId()).get();
        logement.setRating_count(logement.getRating_count()+1);

        Double ratingCache = 0.0;
        for (int i=0;i<logement.getReviews().size(); i++)
            ratingCache+=logement.getReviews().get(i).getNote();
        logement.setRating_cache(ratingCache/ logement.getRating_count());
        logementRepository.save(logement);

        return ResponseEntity.created(new URI("/reviews/"+savedReview.getId())).body(savedReview);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity updateReview(@PathVariable Long id, @RequestBody Review review) {
        Review currentReview = reviewRepository.findById(id).orElseThrow(RuntimeException::new);

        currentReview.setNote(review.getNote());
        currentReview.setMessage(review.getMessage());
        currentReview.setUpdatedAt(review.getUpdatedAt());

        currentReview = reviewRepository.save(currentReview);

        //Update Logement rating cache & rating count
        Logement logement = logementRepository.findById(review.getLogement().getId()).get();
        Double ratingCache = 0.0;
        for (int i=0;i<logement.getReviews().size(); i++)
            ratingCache+=logement.getReviews().get(i).getNote();

        logement.setRating_cache(ratingCache / logement.getRating_count());
        logementRepository.save(logement);

        return ResponseEntity.ok(currentReview);
    }
}
