package com.example.voyage.repository;

import com.example.voyage.entity.Service;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ServicesRepository extends CrudRepository<Service,Long> {
}
