package com.example.voyage.repositories;

import com.example.voyage.entities.Tourist;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TouristRepository extends JpaRepository<Tourist, Long> {
    Tourist findByEmailAndPassword(String email, String password);
}
