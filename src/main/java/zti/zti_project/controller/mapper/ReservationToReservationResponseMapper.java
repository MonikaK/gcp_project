package zti.zti_project.controller.mapper;

import org.springframework.stereotype.Component;
import zti.zti_project.controller.responses.ReservationResponse;
import zti.zti_project.model.Reservation;

import java.util.function.Function;

/**
 * A class that maps object from database (Reservation) to an object containing fields needed on front-end side
 * (ReservationResponse).
 */
@Component
public class ReservationToReservationResponseMapper implements Function<Reservation, ReservationResponse> {

    /**
     * Method overridden from Function interface, returns mapped ReservationResponse object.
     *
     * @param  reservation  object from database to be mapped
     * @return  ReservationResponse object mapped from Reservation
     */
    @Override
    public ReservationResponse apply(Reservation reservation) {
        ReservationResponse reservationResponse = new ReservationResponse();
        reservationResponse.setReservationId(reservation.getReservationId());
        reservationResponse.setFilmTitle(reservation.getRepertoire().getFilm().getTitle());
        reservationResponse.setCinemaHallNumber(reservation.getRepertoire().getCinemaHallNumber());
        reservationResponse.setRowNumber(reservation.getSeat().getRow());
        reservationResponse.setSeatNumber(reservation.getSeat().getSeatNr());
        reservationResponse.setUser(reservation.getUser().getName()+" "+reservation.getUser().getSurname());
        reservationResponse.setTicketType(reservation.getTicketType().getTicketType());
        reservationResponse.setFilmDate(reservation.getFilmDate());
        reservationResponse.setFilmTime(reservation.getFilmTime());
        return reservationResponse;
    }
}
