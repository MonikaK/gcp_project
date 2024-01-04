package zti.zti_project.auth;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

/**
 * A class representing the token response. It contains fields with information about the log in session such as
 * token, token type, id, username and roles.
 */
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class TokenResponse {
    private String token;
    private String type = "Bearer";
    private Integer id;
    private String username;
    private List<String> roles;

    /**
     * A constructor with all fields as arguments except from the token type which is set to Bearer.
     *
     * @param  accessToken Access token generated for authorization
     * @param  id User's id
     * @param  username User's login
     * @param  roles User's roles
     */
    public TokenResponse(String accessToken, Integer id, String username, List<String> roles) {
        this.token = accessToken;
        this.id = id;
        this.username = username;
        this.roles = roles;
    }
}
