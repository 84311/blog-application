package com.example.blogapp.statistics;

import org.springframework.data.jpa.repository.JpaRepository;

public interface EndpointRequestCountRepo extends JpaRepository<EndpointRequestCount, Long> {
    EndpointRequestCount findByEndpoint(String endpoint);
}