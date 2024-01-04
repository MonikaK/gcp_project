package zti.zti_project.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;

/**
 * A class representing the repertoire PostreSQL entity in the system. It contains fields with information about the repertoire
 * such as: repertoireId, film, start date, end date, time and number of cinema hall.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table
public class Repertoire {
    @Id
    @Column
    @GeneratedValue (strategy = GenerationType.AUTO)
    private Integer repertoireId;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(referencedColumnName = "filmId")
    private Film film;

    @Column
    private LocalDate startDate;

    @Column
    private LocalDate endDate;

    @Column
    private LocalTime time;

    @Column
    private Integer cinemaHallNumber;

    /**
     * A constructor with all fields as arguments except from the repertoireId which is a generated value.
     *
     * @param  film Film object which is joined by id with repertoire
     * @param  startDate Start date of the film displaying in the cinema
     * @param  endDate End date of the film displaying in the cinema
     * @param  time Film's time of displaying (only once a day)
     * @param  cinemaHallNumber Number of a cinema hall where the film is displayed
     */
    public Repertoire(Film film, LocalDate startDate, LocalDate endDate, LocalTime time, Integer cinemaHallNumber) {
        this.film = film;
        this.startDate = startDate;
        this.endDate = endDate;
        this.time = time;
        this.cinemaHallNumber = cinemaHallNumber;
    }
}