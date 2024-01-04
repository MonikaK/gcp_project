package zti.zti_project.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import zti.zti_project.model.User;
import zti.zti_project.repository.UsersRepository;

import java.util.Optional;

/**
 * A class implementing the UserDetailsService interface provided by Spring Security. It is responsible for loading user
 * information from the database and creating UserDetails instances.
 */
@Component
public class UserInfoDetailsService implements UserDetailsService {

    @Autowired
    private UsersRepository usersRepository;

    /**
     * Method getting user information from the database based on the provided username.
     *
     * @param username User's login
     * @return A UserDetails object representing the loaded user.
     * @throws UsernameNotFoundException If the user is not found in the database.
     */
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> userInfo = usersRepository.findByLogin(username);
        return userInfo.map(UserInfoDetails::new)
                .orElseThrow(() -> new UsernameNotFoundException("User" + username + "not found"));
    }
}
