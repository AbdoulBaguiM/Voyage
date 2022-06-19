package com.example.voyage.entities;

import lombok.AllArgsConstructor;

import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Table;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "villas")
public class Villa extends Logement {
    private boolean piscine;
    private Long nombreChambre;
    private boolean jardin;

    public boolean isJardin() {
        return jardin;
    }

    public void setJardin(boolean jardin) {
        this.jardin = jardin;
    }

    public boolean isPiscine() {
        return piscine;
    }

    public void setPiscine(boolean piscine) {
        this.piscine = piscine;
    }

    public Long getNombreChambre() {
        return nombreChambre;
    }

    public void setNombreChambre(Long nombreChambre) {
        this.nombreChambre = nombreChambre;
    }
}
