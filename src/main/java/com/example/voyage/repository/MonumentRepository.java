package com.example.voyage.repository;

import com.example.voyage.entity.Monument;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MonumentRepository extends CrudRepository<Monument,Long> {
}
