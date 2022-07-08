package com.example.voyage.repositories;

import com.example.voyage.entities.Chambre;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChambreRepository extends JpaRepository<Chambre,Long> {
}
