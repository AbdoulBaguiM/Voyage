package com.example.voyage.controllers;

import com.example.voyage.entities.Logement;
import com.example.voyage.entities.Villa;
import com.example.voyage.repositories.VillasRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping("/villas")
@CrossOrigin("*")
public class VillasControllers {
    private final VillasRepository villasRepository;

    public VillasControllers(VillasRepository villasRepository) {
       this.villasRepository =villasRepository;
    }
    @GetMapping
    public List<Villa> getVillas(){
        return villasRepository.findAll();
    }
    @GetMapping("/{id}")
    public Logement getVillas(@PathVariable Long id){
        return villasRepository.findById(id).orElseThrow(RuntimeException::new);
    }
    @PostMapping
    public ResponseEntity createVilla(@RequestBody Villa villa) throws URISyntaxException {
        Logement savedLogement = villasRepository.save(villa);
        return ResponseEntity.created(new URI("/villas/"+savedLogement.getId())).body(savedLogement);
    }
    @PutMapping("/{id}")
    public ResponseEntity updateVilla(@PathVariable Long id, @RequestBody Villa villa) {
        Villa currentVilla = villasRepository.findById(id).orElseThrow(RuntimeException::new);
        currentVilla.setNombreChambre(villa.getNombreChambre());
        currentVilla.setJardin(villa.isJardin());
        currentVilla.setPiscine(villa.isPiscine());

        currentVilla = villasRepository.save(villa);
        return ResponseEntity.ok(currentVilla);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity deleteVilla(@PathVariable Long id){
        villasRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

}

