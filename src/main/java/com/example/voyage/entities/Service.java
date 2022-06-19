package com.example.voyage.entities;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "services")
public class Service {
   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
   private Long id;
   private String nom;
   private Double prix;

   @ManyToOne
   private HotelRiad hotelRiad;

    public HotelRiad getHotelRiad() {
        return hotelRiad;
    }

    public void setHotelRiad(HotelRiad hotelRiad) {
        this.hotelRiad = hotelRiad;
    }

    public Double getPrix() {
    return prix;
   }

   public void setPrix(Double prix) {
    this.prix = prix;
   }

   public String getNom() {
    return nom;
   }

   public void setNom(String nom) {
    this.nom = nom;
   }

   public Long getId() {
    return id;
   }

   public void setId(Long id) {
    this.id = id;
   }
}
