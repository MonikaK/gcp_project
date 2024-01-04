package zti.zti_project.auth;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import org.springframework.security.core.AuthenticationException;
import java.io.IOException;

/**
 * A class implementing the AuthenticationEntryPoint interface to handle unauthorized access by sending an HTTP 401
 * Unauthorized error response.
 */
@Component
public class AuthEntryPointJwt implements AuthenticationEntryPoint {

    private static final Logger logger = LoggerFactory.getLogger(AuthEntryPointJwt.class);

    /**
     * Method invoked when unauthorized access is detected. It sends an HTTP 401 Unauthorized error response.
     *
     * @param request Incoming HttpServletRequest.
     * @param response Outgoing HttpServletResponse.
     * @param authException AuthenticationException representing the unauthorized access.
     * @throws IOException If an I/O error occurs while sending the error response.
     */
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException)
            throws IOException {
        logger.error("Unauthorized error: {}", authException.getMessage());
        response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Error: Unauthorized");
    }
}