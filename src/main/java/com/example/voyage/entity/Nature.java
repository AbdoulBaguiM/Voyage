package com.example.voyage.entity;

import lombok.AllArgsConstructor;

import lombok.NoArgsConstructor;


import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@Entity

public class Nature {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String Description ;
    private String type ;
    private String map;
    private String photo;
    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }


    @ManyToOne
    private VilleTouristique ville;

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
        return Description;
    }

    public void setDescription(String description) {
        Description = description;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
