package com.example.voyage.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


import javax.persistence.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "natures")
public class Nature {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String description ;
    private String type ;
    private String map;
    private String photo;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "ville_id")
    @JsonBackReference
    private VilleTouristique ville;

    public Long getVilleId(){
        return this.ville.getId();
    }
    public String getVilleName(){
        return this.ville.getName();
    }
}
