package com.example.voyage.entities;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.Table;

@AllArgsConstructor @NoArgsConstructor
@Entity
@Table(name = "appartements")

public class Appartement extends Logement {
    private Long nombreChambre;
    private boolean ascenseur;
    private boolean agentSecurite;

    public Long getNombreChambre() {
        return nombreChambre;
    }

    public void setNombreChambre(Long nombreChambre) {
        this.nombreChambre = nombreChambre;
    }

    public boolean isAgentSecurite() {
        return agentSecurite;
    }

    public void setAgentSecurite(boolean agentSecurite) {
        this.agentSecurite = agentSecurite;
    }

    public boolean isAscenseur() {
        return ascenseur;
    }

    public void setAscenseur(boolean ascenseur) {
        this.ascenseur = ascenseur;
    }

}
