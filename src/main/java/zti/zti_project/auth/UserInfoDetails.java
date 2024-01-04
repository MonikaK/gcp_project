package zti.zti_project.auth;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import zti.zti_project.model.User;

import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

/**
 * A class implementing the UserDetails interface provided by Spring Security. It represents user details and authentication
 * information.
 */
public class UserInfoDetails implements UserDetails {

    private final Integer userId;
    private final String login;
    private final String password;
    private final List<GrantedAuthority> grantedAuthorityList;

    /**
     * A constructor of UserInfoDetails.
     *
     * @param user User object containing user information.
     */
    public UserInfoDetails(User user) {
        this.userId = user.getUserId();
        this.login = user.getLogin();
        this.password = user.getPassword();
        this.grantedAuthorityList = Arrays.stream(user.getRoles().split(","))
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());

    System.out.println(grantedAuthorityList.get(0));
    System.out.println(grantedAuthorityList.get(1));
    }

    /**
     * Method returning the list of granted authorities associated with the user.
     *
     * @return The list of granted authorities.
     */
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return grantedAuthorityList;
    }

    /**
     * Getter of the user's ID.
     *
     * @return User's ID.
     */
    public Integer getUserId() {
        return userId;
    }

    /**
     * Getter for the user's password.
     *
     * @return User's password.
     */
    @Override
    public String getPassword() {
        return password;
    }

    /**
     * Getter for the user's login.
     *
     * @return User's login.
     */
    @Override
    public String getUsername() {
        return login;
    }

    /**
     * Method indicating if the user's account is non-expired.
     *
     * @return True if the account is non-expired, otherwise false.
     */
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    /**
     * Method indicating if the user's account is non-locked.
     *
     * @return True if the account is non-locked, otherwise false.
     */
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    /**
     * Method indicating if the user's credentials are non-expired.
     *
     * @return True if the credentials are non-expired, otherwise false.
     */
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    /**
     * Method indicating if the user is enabled.
     *
     * @return True if the user is enabled, otherwise false.
     */
    @Override
    public boolean isEnabled() {
        return true;
    }
}
