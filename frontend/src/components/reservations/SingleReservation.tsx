import {useState} from "react";
import {Box, Button, Stack, Typography} from "@mui/material";
import MessageBox from "../utils/MessageBox";
import {fetchDeleteReservation} from "./fetchReservations";

export interface Reservation {
    reservationId: number;
    filmTitle: string;
    rowNumber: number;
    seatNumber: number;
    cinemaHallNumber: number;
    user: string;
    filmDate: string;
    filmTime: string;
    ticketType: string;
}

/**
 * Function representing the component responsible for displaying a tile of single reservation on reservations page.
 */
const SingleReservation = (reservationData: Reservation) => {
    const {reservationId, filmTitle, rowNumber, seatNumber, cinemaHallNumber, user, filmDate, filmTime, ticketType} = reservationData;
    const filmCover = `${process.env.PUBLIC_URL}/${filmTitle.replaceAll(".", "")
        .replaceAll(" ", "-")}.jpg`;
    const [isError, setIsError] = useState(false);
    const [deleted, setDeleted] = useState(false);

    /**
     * Function handling the reservation removal, then displays success/failure info and refreshes page with updated
     * reservation list.
     */
    const handleDeleteReservation = () => {
        fetchDeleteReservation(reservationId.toString())
            .then(() => {
                setDeleted(true);
                setIsError(false);
            })
            .catch(() => setIsError(true));
    }

    return (
        <div>
            <Box
                display="flex"
                flexDirection="row"
                sx={{
                    padding: 2,
                    backgroundColor: "rgba(231,226,182,0.8)",
                    marginY: 2,
                    width: 700,
            }}>
                <Box
                    component="img"
                    sx={{ height: 220 }}
                    alt="film cover"
                    src={filmCover}
                />
                <Stack sx={{marginLeft: 3, textAlign: "left", width: 520}}>
                    <Box display="flex" flexDirection="row" justifyContent="space-between">
                        <Typography fontSize={22} marginBottom={2}>Tytuł filmu: <strong>{filmTitle}</strong></Typography>
                        <Button onClick={handleDeleteReservation} className="button-style">Usuń</Button>
                    </Box>
                    <Typography fontSize={20} marginBottom={1}>Osoba rezerwująca: {user}</Typography>
                    <Box display="flex" flexDirection="row" gap={5} marginBottom={1}>
                        <Typography fontSize={20}>Rząd: {rowNumber}</Typography>
                        <Typography fontSize={20}>Miejsce: {seatNumber}</Typography>
                    </Box>
                    <Box display="flex" flexDirection="row" gap={6} marginBottom={1}>
                        <Typography fontSize={20}>Sala kinowa: {cinemaHallNumber}</Typography>
                        <Typography fontSize={20}>Bilet: {ticketType}</Typography>
                    </Box>
                    <Box display="flex" flexDirection="row" gap={5} marginBottom={1}>
                        <Typography fontSize={20} marginBottom={1}>Data seansu: {filmDate}</Typography>
                        <Typography fontSize={20}>Godzina seansu: {filmTime}</Typography>
                    </Box>
                </Stack>
                <MessageBox
                    isOpen={deleted || isError}
                    text={isError ? "Nie udało się usunąć rezerwacji" : "Usunięto rezerwację"}
                    onClose={() => window.location.reload()}
                    isError={isError}
                />
            </Box>
        </div>
    );
}

export default SingleReservation;