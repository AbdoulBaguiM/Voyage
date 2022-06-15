package com.example.voyage.entity;

import lombok.*;

import javax.persistence.*;
import java.util.Collection;
 @AllArgsConstructor
@NoArgsConstructor
@Entity
 public class VilleTouristique {


     @Id
     @Column(name="name", nullable=false, length=150)
    private String name;
    private Double surface;
    private String meteo;
    private String map;
    private String photo;

     public String getPhoto() {
         return photo;
     }

     public void setPhoto(String photo) {
         this.photo = photo;
     }

     @OneToMany(mappedBy = "ville")
    private Collection<Nature> nature;
    @OneToMany(mappedBy = "ville")
    private Collection<Logements> logemants;
    @OneToMany(mappedBy = "ville")
    private Collection<Guide_Touristique> Guides;
    @OneToMany(mappedBy = "ville")
    private Collection<Monument> monuments;

     public Collection<Monument> getMonuments() {
         return monuments;
     }

     public void setMonuments(Collection<Monument> monuments) {
         this.monuments = monuments;
     }

     public Collection<Guide_Touristique> getGuides() {
         return Guides;
     }

     public void setGuides(Collection<Guide_Touristique> guides) {
         Guides = guides;
     }

     public Collection<Logements> getLogemants() {
         return logemants;
     }

     public void setLogemants(Collection<Logements> logemants) {
         this.logemants = logemants;
     }

     public Collection<Nature> getNature() {
         return nature;
     }

     public void setNature(Collection<Nature> nature) {
         this.nature = nature;
     }

     public String getMap() {
         return map;
     }

     public void setMap(String map) {
         this.map = map;
     }

     public String getMeteo() {
         return meteo;
     }

     public void setMeteo(String meteo) {
         this.meteo = meteo;
     }

     public String getName() {
         return name;
     }

     public void setName(String name) {
         this.name = name;
     }

     public Double getSurface() {
         return surface;
     }

     public void setSurface(Double surface) {
         this.surface = surface;
     }

}
