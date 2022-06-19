package com.example.voyage.entities;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "chambres")
public class Chambre extends Logement {
    private boolean balcon;
    private Long nombreLits;

    @ManyToOne
    private HotelRiad holetRiad;

    public Long getNombreLits() {
        return nombreLits;
    }

    public void setNombreLits(Long nombreLits) {
        this.nombreLits = nombreLits;
    }

    public HotelRiad getHoletRiad() {
        return holetRiad;
    }

    public void setHoletRiad(HotelRiad holetRiad) {
        this.holetRiad = holetRiad;
    }

    public boolean isBalcon() {
        return balcon;
    }

    public void setBalcon(boolean balcon) {
        this.balcon = balcon;
    }
}
