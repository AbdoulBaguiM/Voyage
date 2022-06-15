package com.example.voyage.entity;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;

@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Chambre extends Logements {
    private boolean balcon;
    private Long nombre_lits;

    @ManyToOne
    private Hotel_Riad holet_riad;

    public Hotel_Riad getHolet_riad() {
        return holet_riad;
    }

    public void setHolet_riad(Hotel_Riad holet_riad) {
        this.holet_riad = holet_riad;
    }

    public Long getNombre_lits() {
        return nombre_lits;
    }

    public void setNombre_lits(Long nombre_lits) {
        this.nombre_lits = nombre_lits;
    }

    public boolean isBalcon() {
        return balcon;
    }

    public void setBalcon(boolean balcon) {
        this.balcon = balcon;
    }
}
