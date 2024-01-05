package com.gcp.gcp_project.controller;

import com.gcp.gcp_project.repository.SeatsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

/**
 * A class responsible for handling HTTP requests connected with Seat objects. Only USER role has access to its method.
 */
@RestController
@RequestMapping("/api/seats")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class SeatsController {
    private final SeatsRepository seatsRepository;

    /**
     * Method returning all Seat objects stored in SeatsRepository.
     *
     * @return  ResponseEntity on Seat list type
     */
    @GetMapping("/list")
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<?> getSeats(){
        return ResponseEntity.ok(seatsRepository.findAll());
    }

}
