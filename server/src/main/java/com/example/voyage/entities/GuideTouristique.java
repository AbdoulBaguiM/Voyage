package com.example.voyage.entities;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "guides_touristiques")
public class GuideTouristique {
    @Id
    @Column(name="cin", nullable=false, length=150)
    private String cin;
    private String nom;
    private String prenom;
    private String contact;
    private String photo;
    private Long heureDebutMatin;
    private Long heureDebutSoir;
    private Long heureFinMatin;
    private Long heureFinSoir;

    @ManyToOne
    @JoinColumn(name = "ville_id")
    private VilleTouristique ville;

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    public String getCin() {
        return cin;
    }

    public VilleTouristique getVille() {
        return ville;
    }

    public void setVille(VilleTouristique ville) {
        this.ville = ville;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getContact() {
        return contact;
    }

    public void setContact(String contact) {
        this.contact = contact;
    }

    public Long getHeureDebutMatin() {
        return heureDebutMatin;
    }

    public void setHeureDebutMatin(Long heureDebutMatin) {
        this.heureDebutMatin = heureDebutMatin;
    }

    public Long getHeureDebutSoir() {
        return heureDebutSoir;
    }

    public void setHeureDebutSoir(Long heureDebutSoir) {
        this.heureDebutSoir = heureDebutSoir;
    }

    public Long getHeureFinMatin() {
        return heureFinMatin;
    }

    public void setHeureFinMatin(Long heureFinMatin) {
        this.heureFinMatin = heureFinMatin;
    }

    public Long getHeureFinSoir() {
        return heureFinSoir;
    }

    public void setHeureFinSoir(Long heureFinSoir) {
        this.heureFinSoir = heureFinSoir;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public void setCin(String cin) {
        this.cin = cin;
    }
}
