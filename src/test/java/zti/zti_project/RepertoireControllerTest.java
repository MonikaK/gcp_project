package zti.zti_project;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;
import zti.zti_project.controller.RepertoireController;
import zti.zti_project.controller.mapper.RepertoireToRepertoireResponseMapper;
import zti.zti_project.controller.responses.RepertoireResponse;
import zti.zti_project.model.Film;
import zti.zti_project.model.Repertoire;
import zti.zti_project.repository.FilmRepository;
import zti.zti_project.repository.RepertoireRepository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class RepertoireControllerTest {

    @Mock
    private RepertoireRepository repertoireRepository;

    @Mock
    private RepertoireToRepertoireResponseMapper repertoireToRepertoireResponseMapper;

    @Mock
    private FilmRepository filmRepository;

    @InjectMocks
    private RepertoireController repertoireController;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetAllRepertoire() {
        List<Repertoire> repertoireList = new ArrayList<>();
        Film film = new Film("title", "director", 2023, "polski", true, "2D", "komedia", 90, "description");
        Repertoire repertoire = new Repertoire(film, LocalDate.of(2023,8,5), LocalDate.of(2023, 9, 20), LocalTime.of(18,0, 0), 1);
        repertoireList.add(repertoire);

        when(repertoireRepository.findAll()).thenReturn(repertoireList);

        // Assuming you have a test implementation of RepertoireResponse and mapper
        when(repertoireToRepertoireResponseMapper.apply(repertoire)).thenReturn(new RepertoireResponse());

        ResponseEntity<List<RepertoireResponse>> response = repertoireController.getAllRepertoire();

        assertEquals(200, response.getStatusCodeValue());
        assertEquals(1, Objects.requireNonNull(response.getBody()).size());

        verify(repertoireRepository, times(1)).findAll();
        verify(repertoireToRepertoireResponseMapper, times(1)).apply(repertoire);
    }

    @Test
    public void testAddRepertoire() {
        Film film = new Film("title", "director", 2023, "polski", true, "2D", "komedia", 90, "description");
        Repertoire repertoire = new Repertoire(film, LocalDate.of(2023,8,5), LocalDate.of(2023, 9, 20), LocalTime.of(18,0, 0), 1);

        when(filmRepository.findByTitleAndDirector(any(), any())).thenReturn(film);
        when(repertoireRepository.save(any())).thenReturn(repertoire);

        ResponseEntity<?> response = repertoireController.addRepertoire(repertoire);

        assertEquals(200, response.getStatusCodeValue());

        verify(filmRepository, times(1)).findByTitleAndDirector(any(), any());
        verify(repertoireRepository, times(1)).save(any());
    }
}
