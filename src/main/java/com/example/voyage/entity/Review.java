package com.example.voyage.entity;

import javax.persistence.*;
import java.time.Instant;

@Entity
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "logement_id", nullable = false)
    private Logements logement;

    @Column(name = "note", nullable = false)
    private Integer note;

    @Column(name = "message")
    private String message;

    @Column(name = "created_at")
    private Instant createdAt;


}

