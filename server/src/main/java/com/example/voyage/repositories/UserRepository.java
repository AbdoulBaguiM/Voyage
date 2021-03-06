package com.example.voyage.repositories;


import com.example.voyage.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Long> {
    User findUserById(Long id);
    Optional<User> findByEmail(String email);
    Boolean existsByEmail(String email);
    Boolean existsByTelephone(String telephone);
}
