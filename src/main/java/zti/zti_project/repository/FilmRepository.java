package zti.zti_project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import zti.zti_project.model.Film;

/**
 * An interface representing a controller for managing Film entities. It extends the JpaRepository interface to inherit
 * basic CRUD operations. Apart from its basic methods there are additional methods for querying films based on their
 * title and director.
 */
public interface FilmRepository extends JpaRepository<Film, Integer> {

    /**
     * Method returning a Film object by matching its title and director.
     *
     * @param title Film's title
     * @param director Film's director
     * @return  Film object matching the provided title and director, or null if not found.
     */
    Film findByTitleAndDirector(String title, String director);

    /**
     * Method returning a Film object by matching its title.
     *
     * @param title Film's title
     * @return  Film object matching the provided title or null if not found.
     */
    Film findByTitle(String title);
}
