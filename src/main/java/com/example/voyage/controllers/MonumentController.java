package com.example.voyage.controllers;

import com.example.voyage.entities.Monument;
import com.example.voyage.repositories.MonumentRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping("/monuments")
@CrossOrigin("*")
public class MonumentController {

    private final MonumentRepository monumentRepository;

    public MonumentController(MonumentRepository monumentRepository) {
        this.monumentRepository = monumentRepository;
    }

    @GetMapping
    public List<Monument> getMonuments(){
        return monumentRepository.findAll();
    }

    @GetMapping("/{id}")
    public Monument getMonument(@PathVariable Long id){
        return monumentRepository.findById(id).orElseThrow(RuntimeException::new);
    }

    @PostMapping
    public ResponseEntity createMonument(@RequestBody Monument monument) throws URISyntaxException {
        Monument savedMonument = monumentRepository.save(monument);
        return ResponseEntity.created(new URI("/monuments/"+savedMonument.getId())).body(savedMonument);
    }

    @PutMapping("/{id}")
    public ResponseEntity updateMonument(@PathVariable Long id, @RequestBody Monument monument) {
        Monument currentMonument = monumentRepository.findById(id).orElseThrow(RuntimeException::new);
        currentMonument.setNom(monument.getNom());
        currentMonument.setHistorique(monument.getHistorique());
        currentMonument.setPhoto(monument.getPhoto());
        if(monument.getVille().getId() != null)
            currentMonument.setVille(monument.getVille());

        currentMonument = monumentRepository.save(monument);
        return ResponseEntity.ok(currentMonument);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteMonument(@PathVariable Long id){
        monumentRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
