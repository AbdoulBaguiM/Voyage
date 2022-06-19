package com.example.voyage.repositories;

import com.example.voyage.entities.Nature;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NatureRepository extends CrudRepository<Nature,Long> {
}
