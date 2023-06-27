package com.example.blogapp.statistics;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

import static jakarta.persistence.GenerationType.IDENTITY;

@Entity
@Getter
@Setter
public class EndpointRequestCount {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long id;
    private String endpoint;
    private long requestCount;
}
