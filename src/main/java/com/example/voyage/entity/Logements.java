package com.example.voyage.entity;

import lombok.AllArgsConstructor;

import lombok.NoArgsConstructor;

import javax.persistence.*;
 @AllArgsConstructor
@NoArgsConstructor
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public class Logements {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Double surface;
    private String description;
    private String contacte;
    private String email;

    // Moyenne des notes
    private Double rating_cache;

     //Nombre total de notes
    private int rating_count;

     public String getPhoto() {
         return photo;
     }

     public void setPhoto(String photo) {
         this.photo = photo;
     }

     private String photo;

    @ManyToOne
    private VilleTouristique ville;

     public String getEmail() {
         return email;
     }

     public VilleTouristique getVille() {
         return ville;
     }

     public void setVille(VilleTouristique ville) {
         this.ville = ville;
     }

     public void setEmail(String email) {
         this.email = email;
     }

     public String getContacte() {
         return contacte;
     }

     public void setContacte(String contacte) {
         this.contacte = contacte;
     }

     public String getDescription() {
         return description;
     }

     public void setDescription(String description) {
         this.description = description;
     }

     public Double getSurface() {
         return surface;
     }

     public void setSurface(Double surface) {
         this.surface = surface;
     }

     public Long getId() {
         return id;
     }

     public void setId(Long id) {
         this.id = id;
     }
     public Double getRating_cache() {
         return rating_cache;
     }

     public void setRating_cache(Double rating_cache) {
         this.rating_cache = rating_cache;
     }

     public int getRating_count() {
         return rating_count;
     }

     public void setRating_count(int rating_count) {
         this.rating_count = rating_count;
     }

 }
