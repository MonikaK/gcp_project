import {Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, Typography} from "@mui/material";
import {useContext, useEffect, useRef, useState} from "react";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import SingleRow from "../cinemaHall/SingleRow";
import MessageBox from "../utils/MessageBox";
import { format } from 'date-fns';
import {Reservation} from "./SingleReservation";
import {SessionInfoContext} from "../../App";
import {fetchGetTicketTypes} from "../admin/fetchTickets";
import {fetchAddReservation} from "./fetchReservations";
import {fetchGetOccupiedSeatsByFilm, fetchGetSeats} from "../cinemaHall/fetchSeats";

export interface Seat {
    seatId: number;
    seatNr: number;
    row: number;
    cinemaHall: number;
}

/**
 * Function representing the component responsible for displaying a form to make a reservation.
 */
const ReservationForm = ({
                             modalOpened,
                             onClose,
                             filmTitle,
                             filmTime,
                             cinemaHallNr,
                             startDate,
                             endDate
                         }:{
    modalOpened: boolean;
    onClose: () => void;
    filmTitle: string;
    filmTime?: string;
    cinemaHallNr: number;
    startDate: string;
    endDate: string;
}) => {
    const {user} = useContext(SessionInfoContext);
    const areAllSeatsFetched = useRef(false);
    const areOccupiedSeatsFetched = useRef(false);
    const [chosenSeats, setChosenSeats] = useState([] as Seat[]);
    const [occupiedSeats, setOccupiedSeats] = useState([] as Seat[]);
    const [rows, setRows] = useState([] as Seat[][]);
    const [reservationAdded, setReservationAdded] = useState(false);
    const [chosenFilmDate, setChosenFilmDate] = useState(new Date());
    const [dateChanged, setDateChanged] = useState(true);
    const [isError, setIsError] = useState(false);
    const [ticketTypes, setTicketTypes] = useState<string[]>([]);
    const [ticket, setTicket] = useState("");
    const areTicketTypesFetched = useRef(false);

    /** Fetch ticket types when component mounts. */
    useEffect(() => {
        if(!areTicketTypesFetched.current) {
            fetchGetTicketTypes()
                .then((response) => {
                    setTicketTypes(response.map((ticket) => ticket.ticketType));
                    areTicketTypesFetched.current = true;
                })
                .catch((err) => console.log(err));
        }
    }, []);

    /**
     * Function mapping input values from the form to Reservation object to send it to backend.
     *
     * @return Mapped Reservation object
     */
    const mapToReservation = (seat: Seat, chosenDate: string) => {
        return {
            filmTitle: filmTitle,
            rowNumber: seat.row,
            seatNumber: seat.seatNr,
            cinemaHallNumber: cinemaHallNr,
            user: user?.name+" "+user?.surname,
            filmDate: chosenDate,
            filmTime: filmTime,
            ticketType: ticket
        } as Reservation;
    };

    /**
     * Function handling the addition of a new reservation, then displays success/failure info and a new reservation
     * is added on the Reservation page.
     */
    const handleAddReservation = (chosenSeats: Seat[], chosenDate: string) => {
        chosenSeats.map(seat =>
            fetchAddReservation(mapToReservation(seat, chosenDate))
                .then(() => {
                    setReservationAdded(true);
                    setIsError(false);
                })
                .catch(() => setIsError(true))
        )
    }

    /**
     * Function creating a list of seats rows to enable displaying them on the page.
     *
     * @return List of list of Seat objects
     */
    const generateRows = (seats: Seat[]) => {
        let rowsList = [];
        let rowsNr = 0;
        for (const seat of seats) {
            if(seat.row > rowsNr) {
                rowsNr = seat.row;
            }
        }

        for(let i=0; i<rowsNr; i++) {
            rowsList.push([] as Seat[]);
        }

        for (const seat of seats) {
            rowsList[seat.row-1].push(seat);
        }
        return rowsList;
    }

    /** Fetch seats when component mounts, then list of seats rows is created. */
    useEffect(() => {
        if(!areAllSeatsFetched.current) {
            fetchGetSeats()
                .then((response) => {
                    setRows(generateRows(response.filter((seat) => seat.cinemaHall === cinemaHallNr)));
                    areAllSeatsFetched.current = true;
                })
                .catch((err) => console.log(err));
        }
    }, []);

    /** Fetch occupied seats for a given film and date when component mounts. */
    useEffect(() => {
        if(!areOccupiedSeatsFetched.current && chosenFilmDate && dateChanged) {
            fetchGetOccupiedSeatsByFilm(filmTitle, format(chosenFilmDate, "yyyy-MM-dd"))
                .then((response) => {
                    setOccupiedSeats(response);
                    areOccupiedSeatsFetched.current = true;
                    setDateChanged(false);
                })
                .catch((err) => console.log(err));
        }
    }, [dateChanged]);

    return (
        <Modal open={modalOpened} onClose={onClose} className="modal">
            <>
                <Box sx={{
                    alignContent: "center",
                    alignItems: "center",
                    border: "2px solid black",
                    borderRadius: 3,
                    padding: 2,
                    backgroundColor: "rgba(231,226,182,1)" ,
                    marginY: 2,
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                }}>
                    <Box marginBottom={2} textAlign="center" display="flex" flexDirection="row" gap={7}>
                        <Box>
                            <Typography marginTop={2}>Wybierz datę seansu:</Typography>
                            <DatePicker
                                selected={chosenFilmDate}
                                onChange={(newValue: Date) => {
                                    setChosenFilmDate(newValue);
                                    setDateChanged(true);
                                    areOccupiedSeatsFetched.current = false;
                                }}
                                minDate={new Date(startDate) > new Date() ? new Date(startDate) : new Date()}
                                maxDate={new Date(endDate)}
                                dateFormat="dd/MM/yyyy"
                                className="date-picker"
                            />
                        </Box>
                        <FormControl variant="filled" sx={{ m: 1, minWidth: "126px" }}>
                            <InputLabel id="demo-simple-select-filled-label">Typ biletu</InputLabel>
                            <Select
                                labelId="demo-simple-select-filled-label"
                                id="demo-simple-select-filled"
                                value={ticket}
                                onChange={(e) => setTicket(e.target.value)}
                            >
                                {Array.from(ticketTypes).map((type) =>
                                    <MenuItem key={type} value={type}>{type}</MenuItem>
                                )}
                            </Select>
                        </FormControl>
                    </Box>
                    <Box sx={{
                        width: "400px",
                        backgroundColor: "gray",
                        textAlign: "center",
                        marginBottom: 4
                    }}>
                        <Typography>EKRAN</Typography>
                    </Box>
                    {rows.map((row) =>
                        <SingleRow
                            key={row[0].seatId}
                            seats={row}
                            chosenSeats={chosenSeats}
                            occupied={occupiedSeats}
                            setChosenSeats={setChosenSeats}
                        />
                    )}
                    <Typography marginTop={2}>Wybrane miejsca:</Typography>
                    {chosenSeats.map((seat =>
                        <Box display="flex" flexDirection="row">
                            <Typography marginRight={2}>Rząd: {seat.row}</Typography>
                            <Typography>Miejsce: {seat.seatNr}</Typography>
                        </Box>
                    ))}
                    <Button sx={{marginTop:2}}
                            onClick={() => handleAddReservation(chosenSeats, format(chosenFilmDate, "yyy-MM-dd"))}
                            className="button-style"
                    >Zatwierdź rezerwację</Button>
                    <MessageBox
                        isOpen={reservationAdded || isError}
                        text={isError ? "Rezerwacja nie powiodła się" : "Dodano rezerwację"}
                        onClose={onClose}
                        isError={isError}
                    />
                </Box>
            </>
        </Modal>
    );
}

export default ReservationForm;