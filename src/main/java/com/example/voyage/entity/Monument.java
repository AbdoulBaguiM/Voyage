package com.example.voyage.entity;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Monument {
    @Id
    private Long id;
    private String nom;
    private String Historique;
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

    public String getHistorique() {
        return Historique;
    }

    public void setHistorique(String historique) {
        Historique = historique;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
