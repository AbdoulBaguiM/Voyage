package com.example.voyage.controllers;

import com.example.voyage.entities.Logement;
import com.example.voyage.entities.VilleTouristique;
import com.example.voyage.repositories.LogementRepository;
import com.example.voyage.repositories.VilleTouristiqueRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/search")
@CrossOrigin("*")
public class SearchController {

    private final LogementRepository logementRepository;
    private final VilleTouristiqueRepository villeTouristiqueRepository;

    public SearchController(LogementRepository logementRepository, VilleTouristiqueRepository villeTouristiqueRepository) {
        this.logementRepository = logementRepository;
        this.villeTouristiqueRepository = villeTouristiqueRepository;
    }

    @GetMapping("/{city}")
    public List<Logement> getLogements(@PathVariable String city){
        VilleTouristique villeTouristique = villeTouristiqueRepository.findVilleTouristiqueByName(city);
        return logementRepository.findLogementByVille(villeTouristique);
    }
}
