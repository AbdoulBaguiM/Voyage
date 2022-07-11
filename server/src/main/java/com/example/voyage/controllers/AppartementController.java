package com.example.voyage.controllers;

import com.example.voyage.entities.Appartement;
import com.example.voyage.repositories.AppartementRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping("/appartements")
@CrossOrigin("*")
public class AppartementController {

    private final AppartementRepository appartementRepository ;

    public AppartementController(AppartementRepository appartementRepository) {
        this.appartementRepository = appartementRepository;
    }
    @GetMapping
    public List<Appartement> getAppartements(){
        return appartementRepository.findAll();
    }

    @GetMapping("/{id}")
    public Appartement getAppartement(@PathVariable Long id){
        return appartementRepository.findById(id).orElseThrow(RuntimeException::new);
    }
    @PostMapping
    public ResponseEntity createAppartement(@RequestBody Appartement appartement) throws URISyntaxException {
        Appartement savedAppartement = appartementRepository.save(appartement);
        return ResponseEntity.created(new URI("/appartements/"+savedAppartement.getId())).body(savedAppartement);
    }
    @PutMapping("/{id}")
    public ResponseEntity updateAppartement(@PathVariable Long id, @RequestBody Appartement appartement) {
        Appartement currentAppartement = appartementRepository.findById(id).orElseThrow(RuntimeException::new);
        currentAppartement.setNombreChambre(appartement.getNombreChambre());
        currentAppartement.setAscenseur(appartement.isAscenseur());
        currentAppartement.setAgentSecurite(appartement.isAgentSecurite());


        return ResponseEntity.ok(currentAppartement);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity deleteAppartement(@PathVariable Long id){
        appartementRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
