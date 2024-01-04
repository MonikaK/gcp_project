package zti.zti_project;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;
import zti.zti_project.controller.FilmsController;
import zti.zti_project.model.Film;
import zti.zti_project.repository.FilmRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class FilmsControllerTest {
    @Mock
    private FilmRepository filmRepository;

    @InjectMocks
    private FilmsController filmsController;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetAllFilms() {
        List<Film> filmsList = new ArrayList<>();
        Film film = new Film("title", "director", 2023, "polski", true, "2D", "komedia", 90, "description");
        filmsList.add(film);

        when(filmRepository.findAll()).thenReturn(filmsList);

        ResponseEntity<List<Film>> response = filmsController.getFilms();

        assertEquals(200, response.getStatusCodeValue());
        assertEquals(1, Objects.requireNonNull(response.getBody()).size());

        verify(filmRepository, times(1)).findAll();
    }

    @Test
    public void testGetFilm() {
        String filmTitle = "title";
        Film film = new Film("title", "director", 2023, "polski", true, "2D", "komedia", 90, "description");

        when(filmRepository.findByTitle(filmTitle)).thenReturn(film);

        ResponseEntity<?> response = filmsController.getFilm(filmTitle);

        assertEquals(200, response.getStatusCodeValue());

        verify(filmRepository, times(1)).findByTitle(filmTitle);
    }

    @Test
    public void testAddFilm() {
        Film film = new Film("title", "director", 2023, "polski", true, "2D", "komedia", 90, "description");
        when(filmRepository.save(any())).thenReturn(film);

        ResponseEntity<?> response = filmsController.addFilm(film);

        assertEquals(200, response.getStatusCodeValue());

        verify(filmRepository, times(1)).save(any());
    }
}
