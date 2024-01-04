package zti.zti_project;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.server.resource.web.BearerTokenResolver;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import zti.zti_project.auth.AuthTokenFilter;
import zti.zti_project.auth.UserInfoDetailsService;
import org.springframework.security.oauth2.server.resource.web.DefaultBearerTokenResolver;

/**
 * Configuration class setting up Spring Security for the application. It defines authentication and authorization rules,
 * as well as security filters.
 */
@Configuration
@EnableMethodSecurity
public class SecurityConfig {

    public static final String[] ENDPOINTS_WHITELIST = {
            "/css/**",
            "/",
            "/api/login",
            "/api/logout",
            "/api/users/add",
            "/api/repertoire/list",
    };

    /**
     * Creates a custom UserDetailsService bean that uses UserInfoDetailsService implementation.
     *
     * @return The UserDetailsService bean.
     */
    @Bean
    public UserDetailsService userDetailsService() {
        return new UserInfoDetailsService();
    }

    /**
     * Configures the security filter chain for the application.
     *
     * @param http The HttpSecurity instance.
     * @return The configured SecurityFilterChain.
     * @throws Exception If an error occurs during configuration.
     */
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.authorizeHttpRequests(request ->
                request.requestMatchers(HttpMethod.OPTIONS).permitAll()
                        .requestMatchers(ENDPOINTS_WHITELIST).permitAll()
                        .requestMatchers("/api/films/**").hasAuthority("ROLE_ADMIN")
                        .requestMatchers(HttpMethod.POST, "/api/repertoire/add").hasAuthority("ROLE_ADMIN")
                        .requestMatchers(HttpMethod.POST, "/api/tickets/add").hasAuthority("ROLE_ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/tickets/list").hasAuthority("ROLE_USER")
                        .requestMatchers("/api/reservations/**").hasAuthority("ROLE_USER")
                        .requestMatchers(HttpMethod.GET, "/api/seats/list").hasAuthority("ROLE_USER")
                        .anyRequest().authenticated()
                )
                .csrf().disable()
                .httpBasic(Customizer.withDefaults())
                .oauth2ResourceServer(oauth2 -> oauth2
                        .jwt(jwt -> jwt.jwkSetUri("https://idp.example.com/.well-known/jwks.json"))
                )
                .logout(logout -> logout
                        .logoutUrl("/api/logout")
                        .invalidateHttpSession(true)
                        .deleteCookies("JSESSIONID"))
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.ALWAYS))
                .authenticationProvider(authenticationProvider())
                .addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    /**
     * Creates a BearerTokenResolver bean to resolve bearer tokens.
     *
     * @return The BearerTokenResolver bean.
     */
    @Bean
    BearerTokenResolver bearerTokenResolver() {
        DefaultBearerTokenResolver bearerTokenResolver = new DefaultBearerTokenResolver();
        bearerTokenResolver.setBearerTokenHeaderName(HttpHeaders.PROXY_AUTHORIZATION);
        return bearerTokenResolver;
    }

    /**
     * Creates a PasswordEncoder bean using the BCrypt algorithm.
     *
     * @return The PasswordEncoder bean.
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /**
     * Creates an AuthenticationProvider bean to handle authentication using UserDetailsService.
     *
     * @return The AuthenticationProvider bean.
     */
    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
        authenticationProvider.setUserDetailsService(userDetailsService());
        authenticationProvider.setPasswordEncoder(passwordEncoder());
        return authenticationProvider;
    }

    /**
     * Creates an AuthTokenFilter bean for handling JWT authentication tokens.
     *
     * @return The AuthTokenFilter bean.
     */
    @Bean
    public AuthTokenFilter authenticationJwtTokenFilter() {
        return new AuthTokenFilter();
    }

    /**
     * Creates an AuthenticationManager bean.
     *
     * @param authConfig The AuthenticationConfiguration instance.
     * @return The AuthenticationManager bean.
     * @throws Exception If an error occurs during configuration.
     */
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }
}