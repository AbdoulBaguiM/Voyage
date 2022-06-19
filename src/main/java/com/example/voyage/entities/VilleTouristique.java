package com.example.voyage.entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "villes_touristiques")
public class VilleTouristique {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true,nullable = false)
    private String name;
    private Double surface;
    private String meteo;
    private String map;
    private String photo;

    @OneToMany(mappedBy = "ville")
    private List<Nature> nature;

    @OneToMany(mappedBy = "ville")
    @JsonManagedReference
    private List<Logement> logements;

    @OneToMany(mappedBy = "ville")
    private List<GuideTouristique> guides;

    @OneToMany(mappedBy = "ville")
    private List<Monument> monuments;
}
