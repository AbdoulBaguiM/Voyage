package com.example.voyage.repository;

import com.example.voyage.entity.Guide_Touristique;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Guide_TouristiqueRepository extends CrudRepository<Guide_Touristique,String> {
}
