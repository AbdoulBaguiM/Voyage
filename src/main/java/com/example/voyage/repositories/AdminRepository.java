package com.example.voyage.repositories;

import com.example.voyage.entities.Admin;
import com.example.voyage.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRepository extends JpaRepository<Admin, Long> {
    Admin findByEmailAndPassword(String email, String password);
}
