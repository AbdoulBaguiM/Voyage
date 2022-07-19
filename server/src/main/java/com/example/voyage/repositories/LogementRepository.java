package com.example.voyage.repositories;

import com.example.voyage.entities.Logement;
import com.example.voyage.entities.VilleTouristique;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LogementRepository extends JpaRepository<Logement,Long> {

    List<Logement> findLogementByVille(VilleTouristique ville);
}
