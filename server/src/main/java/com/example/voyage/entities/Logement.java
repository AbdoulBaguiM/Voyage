package com.example.voyage.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@Table(name = "logements")
public class Logement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Double surface;
    private String description;
    private String contact;
    private String email;
    private Double rating_cache = 0.0;
    private int rating_count = 0;
    private String photo;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "ville_id")
    @JsonBackReference
    private VilleTouristique ville;

    @OneToMany(mappedBy = "logement", fetch = FetchType.LAZY)
    private List<Review> reviews = new ArrayList<Review>();

    public Long getVilleId(){
        return this.ville.getId();
    }
    public String getVilleName(){
        return this.ville.getName();
    }
 }
