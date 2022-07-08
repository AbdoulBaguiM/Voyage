package com.example.voyage.controllers;

import com.example.voyage.entities.Chambre;
import com.example.voyage.entities.Logement;
import com.example.voyage.repositories.ChambreRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping("/chambres")
@CrossOrigin("*")
public class ChambreController {
    private final ChambreRepository chambreRepository;

    public ChambreController(ChambreRepository chambreRepository) {
        this.chambreRepository =chambreRepository;
    }
    @GetMapping
    public List<Chambre> getChambre(){
        return chambreRepository.findAll();
    }
    @GetMapping("/{id}")
    public Logement getChambre(@PathVariable Long id){
        return chambreRepository.findById(id).orElseThrow(RuntimeException::new);
    }
    @PostMapping
    public ResponseEntity createChambre(@RequestBody Chambre chambre) throws URISyntaxException {
        Chambre savedChambre = chambreRepository.save(chambre);
        return ResponseEntity.created(new URI("/chambres/"+savedChambre.getId())).body(savedChambre);
    }
    @PutMapping("/{id}")
    public ResponseEntity updateChambre(@PathVariable Long id, @RequestBody Chambre chambre) {
        Chambre currentChambre = chambreRepository.findById(id).orElseThrow(RuntimeException::new);
        currentChambre.setBalcon(chambre.isBalcon());
        currentChambre.setNombreLits(chambre.getNombreLits());
        currentChambre.setHoletRiad(chambre.getHoletRiad());

        currentChambre = chambreRepository.save(chambre);
        return ResponseEntity.ok(currentChambre);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity deleteChambre(@PathVariable Long id){
        chambreRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
