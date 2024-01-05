import {Button} from "@mui/material";
import {Seat} from "../reservations/ReservationForm";
import {useState} from "react";

/**
 * Function representing the component responsible for displaying a single seat in the cinema hall.
 */
const SingleSeat = ({
                       seat,
                       setChosenSeats,
                       chosenSeats,
                       isOccupied
                   }:{
    seat: Seat;
    chosenSeats: Seat[];
    setChosenSeats: (value: Seat[])=>void;
    isOccupied: boolean;
}) => {
    const [chosen, setChosen] = useState(false);

    /**
     * Function handling the seat choice, then updates the list of chosen seats.
     * @param seat Seat object to be chosen
     */
    const handleChooseSeat = (seat: Seat) => {
        if(!chosenSeats.some((s) => s.seatId===seat.seatId)) {
            setChosenSeats([...chosenSeats, seat]);
            setChosen(true);
        }
        else {
            const updatedSeats = [...chosenSeats];
            updatedSeats.splice(chosenSeats.indexOf(seat), 1);
            setChosenSeats(updatedSeats);
            setChosen(false);
        }
    }

    return (
        <Button
            sx={{
                backgroundColor: `${isOccupied ? "red" : (chosen ? "gray" : "green")}`,
                width: "2px",
                marginRight: "2px",
                color: "white",
            }}
            onClick={() => handleChooseSeat(seat)}
            disabled={isOccupied}
        >{seat.seatNr}</Button>
    );
}

export default SingleSeat;