package zti.zti_project.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import zti.zti_project.model.TicketType;
import zti.zti_project.repository.TicketTypeRepository;

/**
 * A class responsible for handling HTTP requests connected with TicketType objects. It's methods have permission
 * either only for USER role or only for ADMIN role.
 */
@RestController
@RequestMapping("/api/tickets")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
//@CrossOrigin(origins = "https://clever-biscochitos-b5c563.netlify.app")
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
