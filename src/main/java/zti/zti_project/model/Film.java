package zti.zti_project.model;

import jakarta.persistence.*;
import lombok.*;

/**
 * A class representing the film PostreSQL entity in the system. It contains fields with information about the film such as:
 * filmId, title, director, year, language, subtitles, type, genre, duration and description.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table
public class Film {
    @Id
    @Column
    @GeneratedValue (strategy = GenerationType.AUTO)
    private Integer filmId;

    @Column
    private String title;

    @Column
    private String director;

    @Column
    private Integer year;

    @Column
    private String language;

    @Column
    private boolean subtitles;

    @Column
    private String type;

    @Column
    private String genre;

    @Column
    private Integer duration;

    @Column
    private String description;

    /**
     * A constructor with all fields as arguments except from the filmId which is a generated value.
     *
     * @param  title Film's title
     * @param  director Film's director
     * @param  year Year of the film premiere in Poland
     * @param  language Film's language
     * @param  subtitles True or false value if polish subtitles are present in a film
     * @param  type Film's type of displaying (2D or 3D)
     * @param  genre Film's genre
     * @param  duration Film's duration in minutes
     * @param  description Short description of a film
     */
    public Film(String title, String director, Integer year,
                String language, boolean subtitles, String type,
                String genre, Integer duration, String description) {
        this.title = title;
        this.director = director;
        this.year = year;
        this.language = language;
        this.subtitles = subtitles;
        this.type = type;
        this.genre = genre;
        this.duration = duration;
        this.description = description;
    }
}