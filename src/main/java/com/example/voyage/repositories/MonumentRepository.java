package com.example.voyage.repositories;

import com.example.voyage.entities.Monument;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MonumentRepository extends JpaRepository<Monument,Long> {
}
