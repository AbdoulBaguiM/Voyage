package com.example.voyage.repository;

import com.example.voyage.entity.VilleTouristique;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VilleTouristiqueRepository extends CrudRepository<VilleTouristique,String> {
}
