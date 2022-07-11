package com.example.voyage.repositories;

import com.example.voyage.entities.Service;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ServiceRepository extends CrudRepository<Service,Long> {
}
