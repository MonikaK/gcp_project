package zti.zti_project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import zti.zti_project.model.User;

import java.util.Optional;

/**
 * An interface representing a controller for managing User entities. It extends the JpaRepository interface to inherit
 * basic CRUD operations. Apart from its basic methods there are additional methods for querying users based on name,
 * surname and login.
 */
public interface UsersRepository extends JpaRepository<User, Integer> {

    /**
     * Method returning a User object by matching name and surname.
     *
     * @param name User's name
     * @param surname User's surname
     * @return  User object matching the provided name and surname.
     */
    User findByNameAndSurname(String name, String surname);

    /**
     * Method returning an optional User object by matching its login.
     *
     * @param username User's login
     * @return An Optional containing the User object matching the provided login, or an empty Optional if not found.
     */
    Optional<User> findByLogin(String username);
}
