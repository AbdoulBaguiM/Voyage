package com.example.voyage.repositories;

import com.example.voyage.entities.Logement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LogementRepository extends JpaRepository<Logement,Long> {
}
