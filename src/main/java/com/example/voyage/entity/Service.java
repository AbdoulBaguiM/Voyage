package com.example.voyage.entity;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import javax.persistence.*;


@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Service {
 @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
 private Long id;
 private String nom;
 private Double prix;
 @ManyToOne
    private Hotel_Riad hotel_riad;

 public Hotel_Riad getHotel_riad() {
  return hotel_riad;
 }

 public void setHotel_riad(Hotel_Riad hotel_riad) {
  this.hotel_riad = hotel_riad;
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
