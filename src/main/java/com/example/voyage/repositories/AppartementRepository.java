package com.example.voyage.repositories;

import com.example.voyage.entities.Appartement;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AppartementRepository extends JpaRepository<Appartement,Long> {
}

