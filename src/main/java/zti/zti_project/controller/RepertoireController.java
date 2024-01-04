package zti.zti_project.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import zti.zti_project.controller.responses.RepertoireResponse;
import zti.zti_project.controller.mapper.RepertoireToRepertoireResponseMapper;
import zti.zti_project.model.Repertoire;
import zti.zti_project.repository.FilmRepository;
import zti.zti_project.repository.RepertoireRepository;

import java.util.List;
import java.util.stream.Collectors;

/**
 * A class responsible for handling HTTP requests connected with Repertoire objects. It's methods have permission
 * for everyone or only for ADMIN role.
 */
@RestController
@RequestMapping("/api/repertoire")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
//@CrossOrigin(origins = "https://clever-biscochitos-b5c563.netlify.app")
public class RepertoireController {
    private final RepertoireRepository repertoireRepository;
    private final RepertoireToRepertoireResponseMapper repertoireToRepertoireResponseMapper;
    private final FilmRepository filmRepository;

    /**
     * Method returning all RepertoireResponse objects mapped from Repertoire objects stored in RepertoireRepository.
     * Everyone has access to get them.
     *
     * @return  ResponseEntity on RepertoireResponse list type
     */
    @GetMapping("/list")
    public ResponseEntity<List<RepertoireResponse>> getAllRepertoire(){
        return ResponseEntity.ok(repertoireRepository.findAll().stream()
                .map(repertoireToRepertoireResponseMapper)
                .collect(Collectors.toList()));
    }

    /**
     * Method saving a given Repertoire object to RepertoireRepository. Only ADMIN role has access to adding new
     * repertoire.
     *
     * @param repertoire A Repertoire object retrieved as a request body from front-end to save in a database.
     * @return  ResponseEntity success or failure status.
     */
    @PostMapping("/add")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<?> addRepertoire(@RequestBody Repertoire repertoire){
        var existingFilm = filmRepository.findByTitleAndDirector(repertoire.getFilm().getTitle(),
                repertoire.getFilm().getDirector());

        return ResponseEntity.ok(repertoireRepository.save(new Repertoire(existingFilm, repertoire.getStartDate(),
                repertoire.getEndDate(), repertoire.getTime(), repertoire.getCinemaHallNumber())));
    }

}
