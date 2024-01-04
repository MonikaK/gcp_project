package zti.zti_project.controller.mapper;

import org.springframework.stereotype.Component;
import zti.zti_project.controller.responses.RepertoireResponse;
import zti.zti_project.model.Repertoire;

import java.util.function.Function;

/**
 * A class that maps object from database (Repertoire) to an object containing fields needed on front-end side
 * (RepertoireResponse).
 */
@Component
public class RepertoireToRepertoireResponseMapper implements Function<Repertoire, RepertoireResponse> {

    /**
     * Method overridden from Function interface, returns mapped RepertoireResponse object.
     *
     * @param  repertoire  object from database to be mapped
     * @return  RepertoireResponse object mapped from Repertoire
     */
    @Override
    public RepertoireResponse apply(Repertoire repertoire) {
        RepertoireResponse repertoireResponse = new RepertoireResponse();
        repertoireResponse.setFilmTitle(repertoire.getFilm().getTitle());
        repertoireResponse.setDirector(repertoire.getFilm().getDirector());
        repertoireResponse.setYear(repertoire.getFilm().getYear());
        repertoireResponse.setLanguage(repertoire.getFilm().getLanguage());
        repertoireResponse.setSubtitles(repertoire.getFilm().isSubtitles());
        repertoireResponse.setType(repertoire.getFilm().getType());
        repertoireResponse.setGenre(repertoire.getFilm().getGenre());
        repertoireResponse.setDuration(repertoire.getFilm().getDuration());
        repertoireResponse.setDescription(repertoire.getFilm().getDescription());
        repertoireResponse.setStartDate(repertoire.getStartDate().toString());
        repertoireResponse.setEndDate(repertoire.getEndDate().toString());
        repertoireResponse.setTime(repertoire.getTime());
        repertoireResponse.setCinemaHallNumber(repertoire.getCinemaHallNumber());

        return repertoireResponse;
    }
}

// TODO
// sprawdzanie, czy godzina w danym dniu jeszcze nie minęła
// sprawdzanie kolizji godzin filmów przy tworzeniu repertuaru

// serwer - obsługa zdarzeń z wykorzystaniem programowania aspektowego - język AspectJ lub Spring AOP;
// dokumentacja - opis funkcjonalności opracowanej aplikacji zarówno części serwerowej jak i klienta;
// dokumentacja - prezentacja wybranych testów jednostkowych i wdrożeniowych dla części serwerowej i klienta;
// dokumentacja - informacja uruchomieniowa (wdrożeniowa);