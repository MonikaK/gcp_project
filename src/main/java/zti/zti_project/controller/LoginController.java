package zti.zti_project.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import zti.zti_project.auth.JwtUtils;
import zti.zti_project.auth.TokenResponse;
import zti.zti_project.auth.UserInfoDetails;

import java.util.List;

/**
 * A controller class handling user's login requests and generating JWT tokens for successful authentication.
 */
@RestController
@RequestMapping("/api/login")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
//@CrossOrigin(origins = "https://clever-biscochitos-b5c563.netlify.app")
public class LoginController {
    private final JwtUtils jwtUtils;

    /**
     * Method handling user's login requests and generating a JWT token upon successful authentication.
     *
     * @param authentication Authentication object containing user authentication information.
     * @return ResponseEntity containing the generated JWT token and user details.
     */
    @PostMapping
    public ResponseEntity<?> login(Authentication authentication){
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserInfoDetails userDetails = (UserInfoDetails) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .toList();

        return ResponseEntity.ok(new TokenResponse(jwt,
                userDetails.getUserId(),
                userDetails.getUsername(),
                roles));
    }

}
