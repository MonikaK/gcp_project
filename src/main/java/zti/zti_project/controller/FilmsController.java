package zti.zti_project.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import zti.zti_project.model.Film;
import zti.zti_project.repository.FilmRepository;

import java.util.List;

/**
 * A class responsible for handling HTTP requests connected with Film objects. Only ADMIN role has access to its methods.
 */
@RestController
@RequestMapping("/api/films")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
//@CrossOrigin(origins = "https://clever-biscochitos-b5c563.netlify.app")
public class FilmsController {

    private final FilmRepository filmRepository;

    /**
     * Method returning all Film objects stored in FilmRepository.
     *
     * @return  ResponseEntity on Films list type
     */
    @GetMapping("/list")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<List<Film>> getFilms(){
        return ResponseEntity.ok(filmRepository.findAll());
    }

    /**
     * Method returning form FilmRepository a Film with given title.
     *
     * @param title Film's title retrieved as a path variable from front-end
     * @return  ResponseEntity on Film type
     */
    @GetMapping("/{title}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<?> getFilm(@PathVariable String title){
        return ResponseEntity.ok(filmRepository.findByTitle(title));
    }

    /**
     * Method saving a given Film object to FilmRepository.
     *
     * @param film A Film object retrieved as a request body from front-end to save in a database.
     * @return  ResponseEntity success or failure status.
     */
    @PostMapping("/add")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<?> addFilm(@RequestBody Film film){
        return ResponseEntity.ok(filmRepository.save(film));
    }
}
