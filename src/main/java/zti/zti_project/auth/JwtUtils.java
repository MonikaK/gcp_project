package zti.zti_project.auth;

import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

import java.security.Key;
import java.util.Date;

import org.slf4j.Logger;

/**
 * A utility class providing methods for working with JWT tokens. It is responsible for generating, parsing and validating
 * tokens.
 */
@Component
public class JwtUtils {
    @Value("${jwtSecret}")
    private String jwtSecret;

    @Value("${jwtExpirationMs}")
    private int jwtExpirationMs;
    private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);

    /**
     * Method generating a JWT token from the provided authentication.
     *
     * @param authentication The authentication object containing user details.
     * @return The generated JWT token.
     */
    public String generateJwtToken(Authentication authentication) {
        UserInfoDetails userInfoDetails = (UserInfoDetails) authentication.getPrincipal();
        return generateTokenFromUsername(userInfoDetails.getUsername());
    }

    /**
     * Method generating a JWT token from the provided username.
     *
     * @param username The username for which the token will be generated.
     * @return The generated JWT token.
     */
    public String generateTokenFromUsername(String username) {
        return Jwts.builder().setSubject(username).setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
                .signWith(SignatureAlgorithm.HS512, key())
                .compact();
    }

    private Key key() {
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret));
    }

    /**
     * Method extracting username from the JWT token.
     *
     * @param token The JWT token.
     * @return The extracted username.
     */
    public String getUserNameFromJwtToken(String token) {

        return Jwts.parserBuilder().setSigningKey(key()).build()
                        .parseClaimsJws(token).getBody().getSubject();
    }

    /**
     * Method validating the JWT token.
     *
     * @param authToken The JWT token to validate.
     * @return True if the token is valid, otherwise false.
     */
    public boolean validateJwtToken(String authToken) {
        try {
            Jwts.parserBuilder().setSigningKey(key()).build().parse(authToken);
            return true;
        } catch (MalformedJwtException e) {
            logger.error("Invalid JWT token: {}", e.getMessage());
        } catch (ExpiredJwtException e) {
            logger.error("JWT token is expired: {}", e.getMessage());
        } catch (UnsupportedJwtException e) {
            logger.error("JWT token is unsupported: {}", e.getMessage());
        } catch (IllegalArgumentException e) {
            logger.error("JWT claims string is empty: {}", e.getMessage());
        }

        return false;
    }
}
