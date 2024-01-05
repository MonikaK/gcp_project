package com.gcp.gcp_project.controller.mapper;

import com.gcp.gcp_project.model.Reservation;
import com.gcp.gcp_project.repository.RepertoireRepository;
import com.gcp.gcp_project.repository.SeatsRepository;
import com.gcp.gcp_project.repository.TicketTypeRepository;
import com.gcp.gcp_project.repository.UsersRepository;
import org.springframework.stereotype.Component;
import com.gcp.gcp_project.controller.responses.ReservationResponse;

import java.util.function.Function;

/**
 * A class that maps object retrieved from front-end side (ReservationResponse) to a database object (Reservation).
 */
@Component
public class ReservationResponseToReservationMapper implements Function<ReservationResponse, Reservation> {
    private final RepertoireRepository repertoireRepository;
    private final SeatsRepository seatsRepository;
    private final UsersRepository usersRepository;
    private final TicketTypeRepository ticketTypeRepository;

    /**
     * A constructor that gets from repository objects needed to invoke a Reservation constructor.
     *
     * @param  repertoireRepository Repository collecting all Repertoire objects
     * @param  seatsRepository Repository collecting all Seat objects
     * @param  usersRepository Repository collecting all User objects
     * @param  ticketTypeRepository Repository collecting all TicketType objects
     */
    public ReservationResponseToReservationMapper(RepertoireRepository repertoireRepository, SeatsRepository seatsRepository, UsersRepository usersRepository, TicketTypeRepository ticketTypeRepository) {
        this.repertoireRepository = repertoireRepository;
        this.seatsRepository = seatsRepository;
        this.usersRepository = usersRepository;
        this.ticketTypeRepository = ticketTypeRepository;
    }

    /**
     * Method overridden from Function interface, creates and returns mapped new Reservation object which is saved
     * in database.
     *
     * @param  reservationResponse  object from front-end to be mapped
     * @return  Reservation object mapped from ReservationResponse
     */
    @Override
    public Reservation apply(ReservationResponse reservationResponse) {
        var repertoire = repertoireRepository.findByFilmTitleAndTime(reservationResponse.getFilmTitle(), reservationResponse.getFilmTime());
        var seat = seatsRepository.findBySeatNrAndRowAndCinemaHall(
                reservationResponse.getSeatNumber(),
                reservationResponse.getRowNumber(),
                repertoire.getCinemaHallNumber());
        String[] userData = reservationResponse.getUser().split(" ");
        var ticketType = ticketTypeRepository.findByTicketType(reservationResponse.getTicketType());
        var user = usersRepository.findByNameAndSurname(userData[0], userData[1]);
        return new Reservation(repertoire, seat, user, ticketType,
                reservationResponse.getFilmDate(), reservationResponse.getFilmTime());
    }
}
