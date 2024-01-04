package zti.zti_project;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;
import zti.zti_project.controller.ReservationsController;
import zti.zti_project.controller.mapper.ReservationResponseToReservationMapper;
import zti.zti_project.controller.mapper.ReservationToReservationResponseMapper;
import zti.zti_project.controller.responses.ReservationResponse;
import zti.zti_project.model.*;
import zti.zti_project.repository.ReservationRepository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.mockito.Mockito.times;

public class ReservationControllerTest {
    @Mock
    private ReservationRepository reservationRepository;

    @Mock
    private ReservationToReservationResponseMapper reservationToReservationResponseMapper;

    @Mock
    private ReservationResponseToReservationMapper reservationResponseToReservationMapper;

    @InjectMocks
    private ReservationsController reservationsController;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    public Reservation createMockReservation() {
        Film film = new Film("title", "director", 2023, "polski", true, "2D", "komedia", 90, "description");
        Repertoire repertoire = new Repertoire(film, LocalDate.of(2023,8,5), LocalDate.of(2023, 9, 20), LocalTime.of(18,0, 0), 1);
        Seat seat = new Seat(1, 1, 1, 1);
        User user = new User(1, "name", "surname", "email", "phone", "login", "password", false, "ROLE_USER");
        TicketType ticketType = new TicketType(1, "normalny");

        return new Reservation(repertoire, seat, user, ticketType, LocalDate.of(2023,8,10), LocalTime.of(18,0, 0));
    }

    @Test
    public void testGetAllReservations() {
        List<Reservation> reservationList = new ArrayList<>();
        Reservation reservation = createMockReservation();
        reservationList.add(reservation);

        when(reservationRepository.findAll()).thenReturn(reservationList);

        when(reservationToReservationResponseMapper.apply(reservation)).thenReturn(new ReservationResponse());

        ResponseEntity<List<ReservationResponse>> response = reservationsController.getAllReservations();

        assertEquals(200, response.getStatusCodeValue());
        assertEquals(1, Objects.requireNonNull(response.getBody()).size());

        verify(reservationRepository, times(1)).findAll();
        verify(reservationToReservationResponseMapper, times(1)).apply(reservation);
    }

    @Test
    public void testGetAllReservationsByUser() {
        String userId = "1";
        List<Reservation> reservationList = new ArrayList<>();
        Reservation reservation = createMockReservation();
        reservationList.add(reservation);

        when(reservationRepository.findAllByUser_UserId(Integer.parseInt(userId))).thenReturn(reservationList);

        when(reservationToReservationResponseMapper.apply(reservation)).thenReturn(new ReservationResponse());

        ResponseEntity<List<ReservationResponse>> response = reservationsController.getAllReservationsByUser(userId);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals(1, Objects.requireNonNull(response.getBody()).size());

        verify(reservationRepository, times(1)).findAllByUser_UserId(Integer.parseInt(userId));
        verify(reservationToReservationResponseMapper, times(1)).apply(reservation);
    }

    @Test
    public void testAddReservation() {
        Reservation reservation = createMockReservation();
        when(reservationRepository.save(any())).thenReturn(reservation);

        ReservationResponse reservationResponse = new ReservationResponse();
        when(reservationResponseToReservationMapper.apply(reservationResponse)).thenReturn(new Reservation());

        ResponseEntity<?> response = reservationsController.addReservation(reservationResponse);

        assertEquals(200, response.getStatusCodeValue());

        verify(reservationRepository, times(1)).save(any());
    }

    @Test
    public void testGetAllChosenSeatsByFilm() {
        String filmTitle = "filmTitle";
        String filmDate = "2023-08-20";
        LocalDate localDate = LocalDate.parse(filmDate, DateTimeFormatter.ofPattern("yyyy-MM-dd"));
        List<Reservation> reservationList = new ArrayList<>();
        Reservation reservation = createMockReservation();
        reservationList.add(reservation);

        when(reservationRepository.findAllByRepertoire_Film_TitleAndFilmDate(filmTitle, localDate)).thenReturn(reservationList);

        ResponseEntity<?> response = reservationsController.getAllChosenSeatsByFilm(filmTitle, filmDate);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals(1, ((List<?>) Objects.requireNonNull(response.getBody())).size());

        verify(reservationRepository, times(1)).findAllByRepertoire_Film_TitleAndFilmDate(filmTitle, localDate);
    }

    @Test
    public void testDeleteReservation() {
        int reservationId = 123;
        Reservation reservation = createMockReservation();

        when(reservationRepository.findById(reservationId)).thenReturn(Optional.of(reservation));

        ResponseEntity<?> response = reservationsController.deleteReservation(String.valueOf(reservationId));

        assertEquals(200, response.getStatusCodeValue());

        verify(reservationRepository, times(1)).findById(reservationId);
        verify(reservationRepository, times(1)).delete(reservation);
    }

    @Test
    public void testDeleteReservationNotFound() {
        int reservationId = 123;

        when(reservationRepository.findById(reservationId)).thenReturn(Optional.empty());

        ResponseEntity<?> response = reservationsController.deleteReservation(String.valueOf(reservationId));

        assertEquals(404, response.getStatusCodeValue());

        verify(reservationRepository, times(1)).findById(reservationId);
        verify(reservationRepository, never()).delete(any());
    }
}
