package zti.zti_project.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;

/**
 * A class representing the reservation PostreSQL entity in the system. It contains fields with information about the reservation
 * such as: reservationId, repertoire, seat, user, ticket type, film date and film type.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table
public class Reservation {
    @Id
    @Column
    @GeneratedValue (strategy = GenerationType.AUTO)
    private Integer reservationId;

    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(referencedColumnName = "repertoireId")
    private Repertoire repertoire;

    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(referencedColumnName = "seatId")
    private Seat seat;

    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(referencedColumnName = "userId")
    private User user;

    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(referencedColumnName = "ticketTypeId")
    private TicketType ticketType;

    @Column
    private LocalDate filmDate;

    @Column
    private LocalTime filmTime;

    /**
     * A constructor with all fields as arguments except from the repertoireId which is a generated value.
     *
     * @param  repertoire Repertoire object which is joined by id with reservation
     * @param  seat Seat object which is joined by id with reservation
     * @param  user User object which is joined by id with reservation
     * @param  ticketType Ticket type
     * @param  filmDate Date of the film
     * @param  filmTime Time of the film
     */
    public Reservation(Repertoire repertoire, Seat seat, User user, TicketType ticketType, LocalDate filmDate, LocalTime filmTime) {
        this.repertoire = repertoire;
        this.seat = seat;
        this.user = user;
        this.ticketType = ticketType;
        this.filmDate = filmDate;
        this.filmTime = filmTime;
    }

}