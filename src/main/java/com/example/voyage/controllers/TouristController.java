package com.example.voyage.controllers;

import com.example.voyage.entities.Tourist;
import com.example.voyage.repositories.TouristRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping("/clients")
@CrossOrigin("*")
public class TouristController {

    private final TouristRepository touristRepository;

    public TouristController(TouristRepository touristRepository) {
        this.touristRepository = touristRepository;
    }

    @GetMapping
    public List<Tourist> getTourists(){
        return touristRepository.findAll();
    }

    @GetMapping("/{id}")
    public Tourist getTourist(@PathVariable Long id){
        return touristRepository.findById(id).orElseThrow(RuntimeException::new);
    }

    @PostMapping
    public ResponseEntity createTourist(@RequestBody Tourist tourist) throws URISyntaxException {
        Tourist savedTourist = touristRepository.save(tourist);
        return ResponseEntity.created(new URI("/clients/"+savedTourist.getId())).body(savedTourist);
    }

    @PutMapping("/{id}")
    public ResponseEntity updateTourist(@PathVariable Long id, @RequestBody Tourist tourist) {
        Tourist currentTourist = touristRepository.findById(id).orElseThrow(RuntimeException::new);
        currentTourist.setName(tourist.getName());
        currentTourist.setLastName(tourist.getLastName());
        currentTourist.setEmail(tourist.getEmail());
        currentTourist.setAvatar(tourist.getAvatar());
        currentTourist.setTelephone(tourist.getTelephone());
        currentTourist.setPassword(tourist.getPassword());
        currentTourist.setPays(tourist.getPays());

        currentTourist = touristRepository.save(tourist);
        return ResponseEntity.ok(currentTourist);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteTourist(@PathVariable Long id){
        touristRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
