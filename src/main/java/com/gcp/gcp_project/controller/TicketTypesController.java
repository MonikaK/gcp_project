package com.gcp.gcp_project.controller;

import com.gcp.gcp_project.model.TicketType;
import com.gcp.gcp_project.repository.TicketTypeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

/**
 * A class responsible for handling HTTP requests connected with TicketType objects. It's methods have permission
 * either only for USER role or only for ADMIN role.
 */
@RestController
@RequestMapping("/api/tickets")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class TicketTypesController {
    private final TicketTypeRepository ticketTypeRepository;

    /**
     * Method returning all TicketType objects stored in TicketTypeRepository.
     *
     * @return  ResponseEntity on TicketType list type
     */
    @GetMapping("/list")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ResponseEntity<?> getTicketTypes(){
        return ResponseEntity.ok(ticketTypeRepository.findAll());
    }

    /**
     * Method saving a given TicketType object to TicketTypeRepository.
     *
     * @param ticketType A ticket type retrieved as a request body from front-end to save in a database.
     * @return  ResponseEntity success or failure status.
     */
    @PostMapping("/add")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<?> addTicketType(@RequestBody String ticketType){
        return ResponseEntity.ok(ticketTypeRepository.save(new TicketType(ticketType)));
    }
}
