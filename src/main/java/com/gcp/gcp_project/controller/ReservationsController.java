package com.gcp.gcp_project.controller;

import com.gcp.gcp_project.controller.mapper.ReservationResponseToReservationMapper;
import com.gcp.gcp_project.controller.mapper.ReservationToReservationResponseMapper;
import com.gcp.gcp_project.controller.responses.ReservationResponse;
import com.gcp.gcp_project.model.Reservation;
import com.gcp.gcp_project.repository.ReservationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

/**
 * A class responsible for handling HTTP requests connected with Reservation objects. Only USER role has access
 * to its methods.
 */
@RestController
@RequestMapping("/api/reservations")
@RequiredArgsConstructor
//@CrossOrigin(origins = "http://localhost:3000")
@CrossOrigin(origins = "http://34.159.233.43:3000")
public class ReservationsController {
    private final ReservationRepository reservationRepository;
    private final ReservationToReservationResponseMapper reservationToReservationResponseMapper;
    private final ReservationResponseToReservationMapper reservationResponseToReservationMapper;

    /**
     * Method returning all ReservationResponse objects mapped from Reservation objects stored in ReservationRepository.
     *
     * @return  ResponseEntity on ReservationResponse list type
     */
    @GetMapping("/list")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ResponseEntity<List<ReservationResponse>> getAllReservations(){

        return ResponseEntity.ok(reservationRepository.findAll().stream()
                .map(reservationToReservationResponseMapper)
                .collect(Collectors.toList()));
    }

    /**
     * Method returning all ReservationResponse objects mapped from Reservation objects stored in ReservationRepository
     * that are assigned to a given user.
     *
     * @param userId User's id retrieved as a path variable from front-end
     * @return  ResponseEntity on ReservationResponse list type
     */
    @GetMapping("/{userId}")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ResponseEntity<List<ReservationResponse>> getAllReservationsByUser(@PathVariable String userId){

        return ResponseEntity.ok(reservationRepository.findAllByUser_UserId(Integer.parseInt(userId)).stream()
                .map(reservationToReservationResponseMapper)
                .toList());
    }

    /**
     * Method saving a given Reservation object to ReservationRepository.
     *
     * @param reservationResponse A ReservationResponse object retrieved as a request body from front-end to map to
     *                            Reservation object and save in a database.
     * @return  ResponseEntity success or failure status.
     */
    @PostMapping("/add")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ResponseEntity<?> addReservation(@RequestBody ReservationResponse reservationResponse){
        return ResponseEntity.ok(reservationRepository.save(reservationResponseToReservationMapper.apply(reservationResponse)));
    }

    /**
     * Method returning form ReservationRepository all Seat objects reserved for a given film and date.
     *
     * @param filmTitle Film's title retrieved as a path variable from front-end
     * @param filmDate Film's date retrieved as a path variable from front-end
     * @return  ResponseEntity on Seat list type
     */
    @GetMapping("/{filmTitle}/{filmDate}")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ResponseEntity<?> getAllChosenSeatsByFilm(@PathVariable String filmTitle, @PathVariable String filmDate){
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate filmLocalDate = LocalDate.parse(filmDate, formatter);
        return ResponseEntity.ok(reservationRepository.findAllByRepertoire_Film_TitleAndFilmDate(filmTitle, filmLocalDate).stream()
                .map(Reservation::getSeat)
                .toList()
        );
    }

    /**
     * Method deleting a given Reservation object from ReservationRepository.
     *
     * @param id A Reservation id retrieved as a path variable to be deleted from a database
     * @return  ResponseEntity success or failure status.
     */
    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ResponseEntity<?> deleteReservation(@PathVariable String id){
        Reservation reservation = reservationRepository.findById(Integer.parseInt(id)).orElse(null);

        if (reservation != null) {
            reservation.setRepertoire(null);
            reservation.setSeat(null);
            reservation.setTicketType(null);
            reservation.setUser(null);
            reservationRepository.delete(reservation);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}