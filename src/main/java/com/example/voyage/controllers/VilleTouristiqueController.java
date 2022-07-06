package com.example.voyage.controllers;

import com.example.voyage.entities.VilleTouristique;
import com.example.voyage.repositories.VilleTouristiqueRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping("/villes")
@CrossOrigin("*")
public class VilleTouristiqueController {

    private final VilleTouristiqueRepository villeTouristiqueRepository;

    public VilleTouristiqueController(VilleTouristiqueRepository villeTouristiqueRepository) {
        this.villeTouristiqueRepository = villeTouristiqueRepository;
    }

    @GetMapping
    public List<VilleTouristique> getVilleTouristiques(){
        return villeTouristiqueRepository.findAll();
    }

    @GetMapping("/{id}")
    public VilleTouristique getVilleTouristique(@PathVariable Long id){
        return villeTouristiqueRepository.findById(id).orElseThrow(RuntimeException::new);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity createVilleTouristique(@RequestBody VilleTouristique villeTouristique) throws URISyntaxException {
        VilleTouristique savedVilleTouristique = villeTouristiqueRepository.save(villeTouristique);
        return ResponseEntity.created(new URI("/villes/"+savedVilleTouristique.getId())).body(savedVilleTouristique);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity updateVilleTouristique(@PathVariable Long id, @RequestBody VilleTouristique villeTouristique) {
        VilleTouristique currentVilleTouristique = villeTouristiqueRepository.findById(id).orElseThrow(RuntimeException::new);
        currentVilleTouristique.setName(villeTouristique.getName());
        currentVilleTouristique.setSurface(villeTouristique.getSurface());
        currentVilleTouristique.setMeteo(villeTouristique.getMeteo());
        currentVilleTouristique.setMap(villeTouristique.getMap());
        currentVilleTouristique.setPhoto(villeTouristique.getPhoto());
        currentVilleTouristique.setNature(villeTouristique.getNature());
        currentVilleTouristique.setLogements(villeTouristique.getLogements());
        currentVilleTouristique.setGuides(villeTouristique.getGuides());
        currentVilleTouristique.setMonuments(villeTouristique.getMonuments());

        currentVilleTouristique = villeTouristiqueRepository.save(villeTouristique);
        return ResponseEntity.ok(currentVilleTouristique);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity deleteVilleTouristique(@PathVariable Long id){
        villeTouristiqueRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
