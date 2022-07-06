package com.example.voyage.controllers;

import com.example.voyage.entities.Nature;
import com.example.voyage.repositories.NatureRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping("/natures")
@CrossOrigin("*")
public class NatureController {

    private final NatureRepository natureRepository;

    public NatureController(NatureRepository natureRepository) {
        this.natureRepository = natureRepository;
    }

    @GetMapping
    public List<Nature> getNatures(){
        return natureRepository.findAll();
    }

    @GetMapping("/{id}")
    public Nature getNature(@PathVariable Long id){
        return natureRepository.findById(id).orElseThrow(RuntimeException::new);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity createNature(@RequestBody Nature nature) throws URISyntaxException {
        Nature savedNature = natureRepository.save(nature);
        return ResponseEntity.created(new URI("/natures/"+savedNature.getId())).body(savedNature);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity updateNature(@PathVariable Long id, @RequestBody Nature nature) {
        Nature currentNature = natureRepository.findById(id).orElseThrow(RuntimeException::new);
        currentNature.setDescription(nature.getDescription());
        currentNature.setType(nature.getType());
        currentNature.setMap(nature.getMap());
        currentNature.setPhoto(nature.getPhoto());
        if(nature.getVille().getId() != null)
            currentNature.setVille(nature.getVille());

        currentNature = natureRepository.save(nature);
        return ResponseEntity.ok(currentNature);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity deleteNature(@PathVariable Long id){
        natureRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
