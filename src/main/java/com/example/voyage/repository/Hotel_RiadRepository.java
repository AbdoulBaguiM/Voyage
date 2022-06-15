package com.example.voyage.repository;

import com.example.voyage.entity.Hotel_Riad;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Hotel_RiadRepository extends CrudRepository<Hotel_Riad,Long> {
}
