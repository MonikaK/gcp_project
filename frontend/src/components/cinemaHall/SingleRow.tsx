import {Box} from "@mui/material";
import {Seat} from "../reservations/ReservationForm";
import SingleSeat from "./SingleSeat";

/**
 * Function representing the component responsible for managing single row in the cinema hall.
 */
const SingleRow = ({
                       seats,
                       setChosenSeats,
                       chosenSeats,
                       occupied
}:{
    seats: Seat[];
    chosenSeats: Seat[];
    setChosenSeats: (value: Seat[])=>void;
    occupied: Seat[];
}) => {

    return (
        <Box sx={{alignContent: "center", marginBottom: 1}}>
            {seats.sort((a, b) => a.seatNr-b.seatNr).map((seat) =>
                <SingleSeat
                    key={seat.seatId}
                    seat={seat}
                    chosenSeats={chosenSeats}
                    setChosenSeats={setChosenSeats}
                    isOccupied={occupied.some((s) => s.seatId===seat.seatId)}
                />
            )}
        </Box>
    );
}

export default SingleRow;