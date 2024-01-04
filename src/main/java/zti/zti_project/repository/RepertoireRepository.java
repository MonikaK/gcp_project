package zti.zti_project.repository;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import zti.zti_project.model.Repertoire;

import java.time.LocalDate;
import java.time.LocalTime;

/**
 * An interface representing a controller for managing Repertoire entities. It extends the JpaRepository interface to inherit
 * basic CRUD operations. Apart from its basic methods there is an additional method for querying repertoires based on film's
 * title and time of displaying.
 */
public interface RepertoireRepository extends JpaRepository<Repertoire, Integer> {

    /**
     * Method returning a Repertoire object by matching film's title and displaying time.
     *
     * @param filmTitle Film's title
     * @param time Time of displaying film in the cinema
     * @return  Repertoire object matching the provided film title and time, or null if not found.
     */
    Repertoire findByFilmTitleAndTime(String filmTitle, LocalTime time);

    /**
     * Method checking the edn date of films' displaying and deleting the old, not actual ones.
     *
     * @param currentDate Date of the current day
     */
    @Transactional
    @Modifying
    @Query("DELETE FROM Repertoire r WHERE r.endDate IS NOT NULL AND r.endDate < :currentDate")
    void deleteExpiredMovies(LocalDate currentDate);
}
