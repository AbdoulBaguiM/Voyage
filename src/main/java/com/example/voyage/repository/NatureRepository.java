package com.example.voyage.repository;

import com.example.voyage.entity.Nature;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NatureRepository extends CrudRepository<Nature,Long> {
}
