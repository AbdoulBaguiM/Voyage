package com.example.voyage.entities;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "monuments")
public class Monument {
    @Id
    private Long id;
    private String nom;
    private String historique;
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

    public String getHistorique() {
        return historique;
    }

    public void setHistorique(String historique) {
        this.historique = historique;
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
