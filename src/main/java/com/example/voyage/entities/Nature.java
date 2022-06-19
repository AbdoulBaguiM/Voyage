package com.example.voyage.entities;

import lombok.AllArgsConstructor;

import lombok.NoArgsConstructor;


import javax.persistence.*;

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

    @ManyToOne
    @JoinColumn(name = "ville_id")
    private VilleTouristique ville;

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    public VilleTouristique getVille() {
        return ville;
    }

    public void setVille(VilleTouristique ville) {
        this.ville = ville;
    }

    public String getMap() {
        return map;
    }

    public void setMap(String map) {
        this.map = map;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
