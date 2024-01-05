import {Box, Modal} from "@mui/material";
import {useEffect, useRef, useState} from "react";
import SingleFilm from "../films/SingleFilm";
import {fetchFilms, Film} from "../films/filmsFetch";

/**
 * Function representing the component responsible for displaying a list of films to choose one and add to repertoire.
 */
const ChooseFilm = ({
                        isOpen,
                        onClose,
                        setFilmTitle
}:{
    isOpen: boolean;
    onClose: () => void;
    setFilmTitle: (value: string) => void;
}) => {
    const [films, setFilms] = useState<Film[]>();
    const isFetched = useRef(false);

    /** Fetch films when component mounts. */
    useEffect(() => {
        if(!isFetched.current) {
            fetchFilms()
                .then((response) => {
                    setFilms(response);
                    isFetched.current = true;
                })
                .catch((err) => console.log(err));
        }
    }, []);

    return (
        <Modal open={isOpen}
               onClose={onClose} className="modal pageBox"
               sx={{marginTop: "20px", overflow: "auto"}}>
            <Box sx={{
                alignContent: "center",
                border: "2px solid black",
                borderRadius: 3,
                padding: 2,
                backgroundColor: "rgba(231,226,182,0.9)",
                marginY: 2,
            }}>
                {films && films.map((film) => (
                     <SingleFilm
                        key={film.title}
                        filmTitle={film.title}
                        director={film.director}
                        year={film.year}
                        language={film.language}
                        subtitles={film.subtitles}
                        genre={film.genre}
                        type={film.type}
                        duration={film.duration}
                        description={film.description}
                        setFilmTitle={setFilmTitle}
                        onClose={onClose}
                    />
                ))}
            </Box>
        </Modal>
    );
}

export default ChooseFilm;