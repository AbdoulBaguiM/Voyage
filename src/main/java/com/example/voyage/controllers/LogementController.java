package com.example.voyage.controllers;

import com.example.voyage.entities.Logement;
import com.example.voyage.repositories.LogementRepository;
import com.example.voyage.repositories.VilleTouristiqueRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping("/logements")
@CrossOrigin("*")
public class LogementController {

    private final LogementRepository logementRepository;

    public LogementController(LogementRepository logementRepository) {
        this.logementRepository = logementRepository;
    }

    @GetMapping
    public List<Logement> getLogements(){
        return logementRepository.findAll();
    }

    @GetMapping("/{id}")
    public Logement getLogement(@PathVariable Long id){
        return logementRepository.findById(id).orElseThrow(RuntimeException::new);
    }

    @PostMapping
    public ResponseEntity createLogement(@RequestBody Logement logement) throws URISyntaxException {
        Logement savedLogement = logementRepository.save(logement);
        return ResponseEntity.created(new URI("/logements/"+savedLogement.getId())).body(savedLogement);
    }

    @PutMapping("/{id}")
    public ResponseEntity updateLogement(@PathVariable Long id, @RequestBody Logement logement) {
        Logement currentLogement = logementRepository.findById(id).orElseThrow(RuntimeException::new);
        currentLogement.setSurface(logement.getSurface());
        currentLogement.setDescription(logement.getDescription());
        currentLogement.setContact(logement.getContact());
        currentLogement.setEmail(logement.getEmail());
        currentLogement.setRating_count(logement.getRating_count());
        currentLogement.setRating_cache(logement.getRating_cache());
        if(logement.getVille().getId() != null)
            currentLogement.setVille(logement.getVille());

        currentLogement.setReviews(logement.getReviews());

        currentLogement = logementRepository.save(logement);
        return ResponseEntity.ok(currentLogement);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteLogement(@PathVariable Long id){
        logementRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
