package com.example.voyage.entity;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Guide_Touristique {
    @Id
    @Column(name="cin", nullable=false, length=150)
    private String cin;
    private String nom;
    private String Prenom;
    private String contacte;
    private String photo;
    private Long heur_debut_matin;
    private Long heur_debut_soir;
    private Long heur_fin_matin;
    private Long heur_fin_soir;
    @ManyToOne
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

    public Long getHeur_fin_soir() {
        return heur_fin_soir;
    }

    public void setHeur_fin_soir(Long heur_fin_soir) {
        this.heur_fin_soir = heur_fin_soir;
    }

    public Long getHeur_fin_matin() {
        return heur_fin_matin;
    }

    public void setHeur_fin_matin(Long heur_fin_matin) {
        this.heur_fin_matin = heur_fin_matin;
    }

    public Long getHeur_debut_soir() {
        return heur_debut_soir;
    }

    public void setHeur_debut_soir(Long heur_debut_soir) {
        this.heur_debut_soir = heur_debut_soir;
    }

    public Long getHeur_debut_matin() {
        return heur_debut_matin;
    }

    public void setHeur_debut_matin(Long heur_debut_matin) {
        this.heur_debut_matin = heur_debut_matin;
    }

    public String getContacte() {
        return contacte;
    }

    public void setContacte(String contacte) {
        this.contacte = contacte;
    }

    public String getPrenom() {
        return Prenom;
    }

    public void setPrenom(String prenom) {
        Prenom = prenom;
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
