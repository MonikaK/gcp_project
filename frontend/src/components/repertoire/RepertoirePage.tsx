import {Box, Button} from "@mui/material";
import {useEffect, useRef, useState} from "react";
import SingleRepertoire from "./SingleRepertoire";
import NewRepertoireForm from "./NewRepertoireForm";
import NewFilmForm from "../films/NewFilmForm";
import Loading from "../utils/Loading";
import {fetchRepertoire} from "./fetchRepertoire";

export interface RepertoireResponse {
    filmTitle: string;
    director: string;
    year: number;
    language: string;
    subtitles: boolean;
    genre: string,
    type: string;
    duration: number;
    description: string;
    cinemaHallNumber: number;
    startDate: string;
    endDate: string;
    time: string;
}

/**
 * Function representing the component responsible for displaying and managing a repertoire page.
 */
const RepertoirePage = ({isAdmin}:{isAdmin?: boolean}) => {
    const [repertoires, setRepertoires] = useState<RepertoireResponse[]>();
    const [repModalOpened, setRepModalOpened] = useState(false);
    const [filmModalOpened, setFilmModalOpened] = useState(false);
    const isFetched = useRef(false);

    /** Fetch repertoire when component mounts. */
    useEffect(() => {
        if(!isFetched.current) {
            fetchRepertoire()
                .then((response) => {
                    setRepertoires(response);
                    isFetched.current = true;
                })
                .catch((err) => console.log(err));
        }
    }, []);

    const closeRepModal = () => setRepModalOpened(false);
    const closeFilmModal = () => setFilmModalOpened(false);

    return !isFetched.current ?
        <Loading /> :
        (<div>
            <Box sx={{
                alignContent: "center",
                border: "2px solid black",
                borderRadius: 3,
                padding: 2,
                backgroundColor: "rgba(231,226,182,0.8)",
                marginY: 3,
                overflow: "auto",
                maxHeight: "100%"
            }}
            >
                {isAdmin &&
                    <Box sx={{display: "flex", flexDirection: "row", justifyContent: "flex-end"}}>
                        <Button onClick={() => setRepModalOpened(true)}
                                className="button-style"
                                sx={{marginX: 3, marginTop: 2}}
                        >
                            Dodaj do repertuaru
                        </Button>
                        <Button onClick={() => setFilmModalOpened(true)}
                                className="button-style"
                                sx={{marginTop: 2}}
                        >
                            Dodaj film
                        </Button>
                    </Box>
                }
                {repertoires && repertoires.map((repertoire) => {
                    return <SingleRepertoire
                        key={repertoire.filmTitle}
                        filmTitle={repertoire.filmTitle}
                        director={repertoire.director}
                        year={repertoire.year}
                        language={repertoire.language}
                        subtitles={repertoire.subtitles}
                        genre={repertoire.genre}
                        type={repertoire.type}
                        duration={repertoire.duration}
                        description={repertoire.description}
                        cinemaHallNumber={repertoire.cinemaHallNumber}
                        time={repertoire.time}
                        startDate={repertoire.startDate}
                        endDate={repertoire.endDate}
                    />
                })}
            </Box>
            {repModalOpened &&
                <NewRepertoireForm modalOpened={repModalOpened} onClose={closeRepModal}/>
            }
            {filmModalOpened &&
                <NewFilmForm modalOpened={filmModalOpened} onClose={closeFilmModal}/>
            }
        </div>
    );
}

export default RepertoirePage;