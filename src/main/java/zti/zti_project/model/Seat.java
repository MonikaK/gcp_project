package zti.zti_project.model;

import jakarta.persistence.*;
import lombok.*;

/**
 * A class representing the seat PostreSQL entity in the system. It contains fields with information about the seat such as:
 * seatId (generated value), seat number, row, cinema hall number.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table
public class Seat {
    @Id
    @Column
    @GeneratedValue (strategy = GenerationType.AUTO)
    private Integer seatId;

    @Column
    private Integer seatNr;

    @Column
    private Integer row;

    @Column
    private Integer cinemaHall;

}