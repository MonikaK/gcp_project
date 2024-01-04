package zti.zti_project.controller.responses;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalTime;

/**
 * A class representing repertoire information needed on front-end side. It is an extension of Repertoire class,
 * the additional fields' values are taken from joined table (Film).
 */
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class RepertoireResponse {

    private String filmTitle;
    private String director;
    private Integer year;
    private String language;
    private boolean subtitles;
    private String type;
    private String genre;
    private Integer duration;
    private String description;
    private String startDate;
    private String endDate;
    private LocalTime time;
    private Integer cinemaHallNumber;
}
