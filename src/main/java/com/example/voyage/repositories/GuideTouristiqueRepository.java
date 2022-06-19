package com.example.voyage.repositories;

import com.example.voyage.entities.GuideTouristique;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GuideTouristiqueRepository extends CrudRepository<GuideTouristique,String> {
}
