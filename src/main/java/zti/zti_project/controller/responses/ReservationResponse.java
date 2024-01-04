package zti.zti_project.controller.responses;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

/**
 * A class representing reservation information needed on front-end side. It is an extension of Reservation class,
 * the additional fields' values are taken from joined tables (Repertoire, Seat, User, TicketType).
 */
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ReservationResponse {
    private Integer reservationId;
    private String filmTitle;
    private Integer rowNumber;
    private Integer seatNumber;
    private Integer cinemaHallNumber;
    private String user;
    private String ticketType;
    private LocalDate filmDate;
    private LocalTime filmTime;
}
