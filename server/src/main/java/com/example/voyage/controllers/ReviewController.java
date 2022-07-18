package com.example.voyage.controllers;

import com.example.voyage.entities.Review;
import com.example.voyage.repositories.UserRepository;
import com.example.voyage.repositories.ReviewRepository;
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

    private final UserRepository userRepository;
    private final ReviewRepository reviewRepository;

    public ReviewController(ReviewRepository reviewRepository, UserRepository userRepository) {
        this.reviewRepository = reviewRepository;
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

    @PostMapping
    public ResponseEntity createReview(@RequestBody Review review) throws URISyntaxException {
        review.setCreatedAt(Instant.now());
        review.setUpdatedAt(Instant.now());
        Review savedReview = reviewRepository.save(review);
        return ResponseEntity.created(new URI("/reviews/"+savedReview.getId())).body(savedReview);
    }

    @PutMapping("/{id}")
//    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity updateReview(@PathVariable Long id, @RequestBody Review review) {
        Review currentReview = reviewRepository.findById(id).orElseThrow(RuntimeException::new);
        currentReview.setNote(review.getNote());
        currentReview.setMessage(review.getMessage());
        currentReview.setUpdatedAt(review.getUpdatedAt());

        currentReview = reviewRepository.save(review);
        return ResponseEntity.ok(currentReview);
    }

    @DeleteMapping("/{id}")
 //   @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity deleteReview(@PathVariable Long id){
        reviewRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
