package com.example.voyage.controllers;

import com.example.voyage.entities.HotelRiad;
import com.example.voyage.repositories.HotelRiadRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping("/hotels")
@CrossOrigin("*")
public class HotelRiadController {

    private final HotelRiadRepository hotelRiadRepository;

    public HotelRiadController(HotelRiadRepository hotelRiadRepository) {
        this.hotelRiadRepository = hotelRiadRepository;
    }

    @GetMapping
    public List<HotelRiad> getHotelRiads(){
        return hotelRiadRepository.findAll();
    }

    @GetMapping("/{id}")
    public HotelRiad getHotelRiad(@PathVariable Long id){
        return hotelRiadRepository.findById(id).orElseThrow(RuntimeException::new);
    }

    @PostMapping
    public ResponseEntity createHotelRiad(@RequestBody HotelRiad hotelRiad) throws URISyntaxException {
        HotelRiad savedHotelRiad = hotelRiadRepository.save(hotelRiad);
        return ResponseEntity.created(new URI("/hotels/"+savedHotelRiad.getId())).body(savedHotelRiad);
    }

    @PutMapping("/{id}")
    public ResponseEntity updateHotelRiad(@PathVariable Long id, @RequestBody HotelRiad hotelRiad) {
        HotelRiad currentHotelRiad = hotelRiadRepository.findById(id).orElseThrow(RuntimeException::new);
        currentHotelRiad.setName(hotelRiad.getName());
        currentHotelRiad.setAppreciation(hotelRiad.getAppreciation());
        currentHotelRiad.setType(hotelRiad.isType());
        currentHotelRiad.setPhoto(hotelRiad.getPhoto());
        currentHotelRiad.setChambres(hotelRiad.getChambres());
        currentHotelRiad.setServices(hotelRiad.getServices());

        currentHotelRiad = hotelRiadRepository.save(hotelRiad);
        return ResponseEntity.ok(currentHotelRiad);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteHotelRiad(@PathVariable Long id){
        hotelRiadRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
