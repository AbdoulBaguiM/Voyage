package com.example.voyage.entity;

import lombok.AllArgsConstructor;

import lombok.NoArgsConstructor;

import javax.persistence.Entity;

@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Villa extends Logements{
    private boolean piscine;

    private Long nombre_chambre;
    private boolean jardin;



    public Long getNombre_chambre() {
        return nombre_chambre;
    }

    public void setNombre_chambre(Long nombre_chambre) {
        this.nombre_chambre = nombre_chambre;
    }

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
}
