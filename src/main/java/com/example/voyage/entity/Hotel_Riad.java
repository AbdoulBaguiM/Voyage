package com.example.voyage.entity;

import lombok.AllArgsConstructor;

import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Collection;

@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Hotel_Riad {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long Appreciation;

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    private String photo;

    public boolean isType() {
        return type;
    }

    public void setType(boolean type) {
        this.type = type;
    }

    private boolean type;
    @OneToMany(mappedBy ="holet_riad")
    private Collection<Chambre> chambres;
    @OneToMany(mappedBy ="hotel_riad")
    private Collection<Service> services;

    public Long getId() {
        return id;
    }

    public Collection<Service> getServices() {
        return services;
    }

    public void setServices(Collection<Service> services) {
        this.services = services;
    }

    public Collection<Chambre> getChambres() {
        return chambres;
    }

    public void setChambres(Collection<Chambre> chambres) {
        this.chambres = chambres;
    }

    public Long getAppreciation() {
        return Appreciation;
    }

    public void setAppreciation(Long appreciation) {
        Appreciation = appreciation;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
