package zti.zti_project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import zti.zti_project.model.Reservation;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Collection;
import java.util.List;

/**
 * An interface representing a controller for managing Reservation entities. It extends the JpaRepository interface to inherit
 * basic CRUD operations. Apart from its basic methods there are additional methods for querying reservations based on film's
 * title, film's date and user's id.
 */
public interface ReservationRepository extends JpaRepository<Reservation, Integer> {

    /**
     * Method returning a list of Reservation objects by matching film's title and displaying time.
     *
     * @param filmTitle Film's title
     * @param filmDate Reserved date of the film
     * @return  List of Reservation objects matching the provided film title and date.
     */
    List<Reservation> findAllByRepertoire_Film_TitleAndFilmDate(String filmTitle, LocalDate filmDate);

    /**
     * Method returning a list of Reservation objects associated with a specific user.
     *
     * @param userId The ID of the user whose reservations are queried.
     * @return A list of Reservation objects associated with the provided user ID.
     */
    List<Reservation> findAllByUser_UserId(Integer userId);
}
