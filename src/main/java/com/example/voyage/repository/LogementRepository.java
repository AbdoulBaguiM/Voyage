package com.example.voyage.repository;

import com.example.voyage.entity.Logements;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LogementRepository extends CrudRepository<Logements,Long> {
}
