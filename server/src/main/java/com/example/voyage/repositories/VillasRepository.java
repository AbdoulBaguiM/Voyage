package com.example.voyage.repositories;


import com.example.voyage.entities.Villa;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VillasRepository extends JpaRepository<Villa,Long> {
}
