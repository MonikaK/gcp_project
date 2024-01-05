import {useContext, useState} from "react";
import {Box, Button, Stack, Typography} from "@mui/material";
import {RepertoireResponse} from "./RepertoirePage";
import ReservationForm from "../reservations/ReservationForm";
import MessageBox from "../utils/MessageBox";
import {SessionInfoContext} from "../../App";
import {Film} from "../films/filmsFetch";

export interface Repertoire {
    film: Film;
    startDate: string;
    endDate: string;
    time: string;
    cinemaHallNumber: number;
}

/**
 * Function representing the component responsible for displaying a tile of repertoire for a single film.
 */
const SingleRepertoire = (repertoireData:RepertoireResponse) => {
    const {loggedIn} = useContext(SessionInfoContext);
    const [logIn, setLogIn] = useState(false);
    const {filmTitle, director, year, language, subtitles, genre, type, duration, description, cinemaHallNumber, time,
        startDate, endDate} = repertoireData;
    const filmCover = `${process.env.PUBLIC_URL}/${filmTitle.replaceAll(".", "")
        .replaceAll(" ", "-")}.jpg`; // || placeholder;
    const [modalOpened, setModalOpened] = useState(false);
    const closeModal = () => setModalOpened(false);

    return (
        <div>
            <Box
                sx={{
                    padding: 2,
                    backgroundColor: "rgba(231,226,182,0.8)",
                    marginY: 2,
                    width: "830px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                <Box
                    component="img"
                    sx={{ height: 220 }}
                    alt="film cover"
                    src={filmCover}
                />
                <Stack sx={{marginLeft: 3, textAlign: "left"}}>
                    <Box display="flex" gap={5} justifyContent="space-between">
                        <Typography fontSize={22} marginBottom={2}>Tytuł filmu: <strong>{filmTitle}</strong></Typography>
                        <Typography fontSize={22}>{duration} minut</Typography>
                        <Button onClick={() => loggedIn ? setModalOpened(true) : setLogIn(true)}
                                className="button-style">Zarezerwuj</Button>
                    </Box>
                    <Typography fontSize={20}>Reżyser: {director}</Typography>
                    <Box display="flex" flexDirection="row" gap={6}>
                        <Typography fontSize={20}>Rok wydania: {year}</Typography>
                        <Typography fontSize={20}>Język: {language}</Typography>
                        {subtitles &&
                            <Typography fontSize={20}>Napisy: PL</Typography>
                        }
                    </Box>
                    <Typography fontSize={20}>Okres emisji: {startDate} - {endDate}</Typography>
                    <Box display="flex" flexDirection="row" gap={6}>
                        <Typography fontSize={20}>Gatunek: {genre}</Typography>
                        <Typography fontSize={20}>Typ seansu: {type}</Typography>
                        <Typography fontSize={20}>Godzina: {time}</Typography>
                    </Box>
                    <Typography fontSize={20} marginTop={2}>Opis: {description}</Typography>
                </Stack>
            </Box>
            <Box marginLeft="50%">
                {modalOpened &&
                    <ReservationForm
                        modalOpened={modalOpened}
                        onClose={closeModal}
                        filmTitle={filmTitle}
                        cinemaHallNr={cinemaHallNumber}
                        filmTime={time}
                        startDate={startDate}
                        endDate={endDate}
                    />
                }
            </Box>
            <MessageBox
                isOpen={logIn}
                text={"Należy się zalogować"}
                onClose={() => setLogIn(false)}
                isError
            />
        </div>
    );
}

export default SingleRepertoire;