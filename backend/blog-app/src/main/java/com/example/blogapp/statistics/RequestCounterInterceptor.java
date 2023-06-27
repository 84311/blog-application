package com.example.blogapp.statistics;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
@RequiredArgsConstructor
public class RequestCounterInterceptor implements HandlerInterceptor {
    private final EndpointRequestCountRepo endpointRequestCountRepo;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        String endpoint = request.getRequestURI();
        EndpointRequestCount endpointRequestCount = endpointRequestCountRepo.findByEndpoint(endpoint);

        if (endpointRequestCount == null) {
            endpointRequestCount = new EndpointRequestCount();
            endpointRequestCount.setEndpoint(endpoint);
        }

        endpointRequestCount.setRequestCount(endpointRequestCount.getRequestCount() + 1);
        endpointRequestCountRepo.save(endpointRequestCount);

        return true;
    }
}