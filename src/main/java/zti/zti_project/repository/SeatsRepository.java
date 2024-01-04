package zti.zti_project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import zti.zti_project.model.Seat;

/**
 * An interface representing a controller for managing Seat entities. It extends the JpaRepository interface to inherit
 * basic CRUD operations. Apart from its basic methods there is an additional method for querying seats based on seat
 * number, row and number of cinema hall.
 */
public interface SeatsRepository extends JpaRepository<Seat, Integer> {

    /**
     * Method returning a Seat object by matching seat number, row and number of cinema hall.
     *
     * @param seatNr Number of a seat in given row
     * @param row Number of a row
     * @param cinemaHall Number of a cinema hall
     * @return  Seat object matching the provided seat number, row and number of cinema hall.
     */
    Seat findBySeatNrAndRowAndCinemaHall(Integer seatNr, Integer row, Integer cinemaHall);
}
