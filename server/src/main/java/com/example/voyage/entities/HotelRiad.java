package com.example.voyage.entities;

import lombok.AllArgsConstructor;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "hotels_riads")
public class HotelRiad {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String name;
    private Long appreciation;
    private boolean type=false;
    private String photo;

    @OneToMany(mappedBy ="holetRiad")
    private List<Chambre> chambres;

    @OneToMany(mappedBy ="hotelRiad")
    private List<Service> services;

}
