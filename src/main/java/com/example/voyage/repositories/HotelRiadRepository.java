package com.example.voyage.repositories;

import com.example.voyage.entities.HotelRiad;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HotelRiadRepository extends JpaRepository<HotelRiad,Long> {
}
