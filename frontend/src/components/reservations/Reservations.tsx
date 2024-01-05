import {Box, Typography} from "@mui/material";
import {useContext, useEffect, useRef, useState} from "react";
import SingleReservation, {Reservation} from "./SingleReservation";
import Loading from "../utils/Loading";
import {SessionInfoContext} from "../../App";
import {fetchReservations, fetchReservationsByUserId} from "./fetchReservations";

/**
 * Function representing the component responsible for managing reservations page.
 */
const Reservations = () => {
    const [reservations, setReservations] = useState<Reservation[]>();
    const isFetched = useRef(false);
    const {user} = useContext(SessionInfoContext);

    /** Fetch user's reservations when component mounts. */
    useEffect(() => {
        if(!isFetched.current && user && !user.admin) {
            fetchReservationsByUserId(localStorage.getItem("userId") || "")
                .then((response) => {
                    setReservations(response);
                    isFetched.current = true;
                })
                .catch((err) => console.log(err));
        }
    }, [user]);

    /** Fetch all reservations when component mounts (used for admin role). */
    useEffect(() => {
        if(!isFetched.current && user && user.admin) {
            fetchReservations()
                .then((response) => {
                    setReservations(response);
                    isFetched.current = true;
                })
                .catch((err) => console.log(err));
        }
    }, [user]);

    return !isFetched.current ?
        <Loading /> :
        (<div>
            <Box sx={{
                alignContent: "center",
                border: "2px solid black",
                borderRadius: 3,
                padding: 2,
                backgroundColor: "rgba(231,226,182,0.8)",
                marginY: 2,
                overflow: "auto",
                maxHeight: "90%"
            }}
                 className="pageBox"
            >
                {reservations?.length===0 &&
                    <Typography fontSize={20}>Brak rezerwacji</Typography>
                }
                {reservations && reservations.map((reservation) => (
                    <SingleReservation
                        key={reservation.reservationId}
                        reservationId={reservation.reservationId}
                        filmTitle={reservation.filmTitle}
                        rowNumber={reservation.rowNumber}
                        seatNumber={reservation.seatNumber}
                        cinemaHallNumber={reservation.cinemaHallNumber}
                        user={reservation.user}
                        filmDate={reservation.filmDate}
                        filmTime={reservation.filmTime}
                        ticketType={reservation.ticketType}/>
                ))}
            </Box>
        </div>
    );
}

export default Reservations;