package com.example.voyage.entity;

import lombok.*;

import javax.persistence.Entity;

@AllArgsConstructor @NoArgsConstructor
@Entity
public class Appartement extends Logements{
    private Long nombre_chambre;
    private boolean ascenseur;
    private boolean agent_securite;


    public boolean isAscenseur() {
        return ascenseur;
    }

    public boolean isAgent_securite() {
        return agent_securite;
    }

    public void setAgent_securite(boolean agent_securite) {
        this.agent_securite = agent_securite;
    }

    public void setAscenseur(boolean ascenseur) {
        this.ascenseur = ascenseur;
    }

    public Long getNombre_chambre() {
        return nombre_chambre;
    }

    public void setNombre_chambre(Long nombre_chambre) {
        this.nombre_chambre = nombre_chambre;
    }
}
