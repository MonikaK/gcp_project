import {Repertoire} from "./SingleRepertoire";
import {useEffect, useRef, useState} from "react";
import MessageBox from "../utils/MessageBox";
import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Modal,
    Select,
    Typography
} from "@mui/material";
import DatePicker from "react-datepicker";
import ChooseFilm from "./ChooseFilm";
import {fetchFilm, Film} from "../films/filmsFetch";
import {fetchAddRepertoire} from "./fetchRepertoire";
import {fetchGetSeats} from "../cinemaHall/fetchSeats";
import {useNavigate} from "react-router-dom";

/**
 * Function representing the component responsible for displaying and managing a form for adding film to the repertoire.
 */
const NewRepertoireForm = ({modalOpened, onClose}:{modalOpened: boolean; onClose: ()=> void}) => {
    const navigate = useNavigate();
    const [isError, setIsError] = useState(false);
    const [filmAdded, setFilmAdded] = useState(false);
    const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([new Date(), new Date()]);
    const [startDate, endDate] = dateRange;
    const [time, setTime] = useState("");
    const [cinemaHallNumber, setCinemaHallNumber] = useState(0);
    const [cinemaHalls, setCinemaHalls] = useState(new Set<number>());
    const hours = ["10:30", "12:00", "13:30", "15:00", "16:30", "18:00", "19:30", "21:00"];
    const [filmTitle, setFilmTitle] = useState("");
    const [isChooseFilmClicked, setIsChooseFilmClicked] = useState(false);
    const [repData, setRepData] = useState<Repertoire>();
    const areAllSeatsFetched = useRef(false);

    /** Fetch seats when component mounts. A set of cinema halls numbers is created to be passed to form select input. */
    useEffect(() => {
        if(!areAllSeatsFetched.current) {
            fetchGetSeats()
                .then((response) => {
                    setCinemaHalls(new Set<number>(response.map((seat) => seat.cinemaHall)));
                    areAllSeatsFetched.current = true;
                })
                .catch((err) => console.log(err));
        }
    }, []);

    /**
     * Function mapping input values from the form and film data from response to Repertoire object to be sent to backend.
     */
    const mapToRepertoire = (response: Film | null) => {
        const startDateString = startDate ? startDate?.toLocaleDateString().split(".") : [];
        const endDateString = endDate ? endDate?.toLocaleDateString().split(".") : [];
        setRepData(
            {
                film: response,
                startDate: startDateString[2]+"-"+startDateString[1]+"-"+startDateString[0],
                endDate: endDateString[2]+"-"+endDateString[1]+"-"+endDateString[0],
                time: time,
                cinemaHallNumber: cinemaHallNumber
            } as Repertoire
        );
    }

    /** Fetch films when component mounts and form input values are already provided. */
    useEffect(() => {
        if(filmTitle && startDate && endDate && time && cinemaHallNumber) {
            fetchFilm(filmTitle)
                .then((response) => response && mapToRepertoire(response))
                .catch(() => setIsError(true));
        }
    }, [startDate, endDate, time, cinemaHallNumber]);

    /**
     * Function handling the addition of a new repertoire, then displays success/failure info and refreshes page with
     * updated repertoire list.
     */
    const handleAddRepertoire = () => {
        repData &&
        fetchAddRepertoire(repData)
            .then(() => {
                setFilmAdded(true);
                setIsError(false);
            })
            .catch(() => setIsError(true));
    }

    return (
        <div>
            <Modal open={modalOpened} onClose={onClose} className="modal" sx={{marginTop: "40px"}}>
                <Box sx={{
                    alignContent: "center",
                    border: "2px solid black",
                    borderRadius: 3,
                    padding: 2,
                    backgroundColor: "rgba(231,226,182,1)" ,
                    marginY: 2,
                }}>
                    <Box display="flex" flexDirection="row" gap={2}>
                        <Button onClick={()=>setIsChooseFilmClicked(true)} className="button-style">
                            Wybierz film
                        </Button>
                        <Typography marginTop={1}>Tytuł:</Typography>
                        <Typography marginTop={1} fontWeight="bold">{filmTitle}</Typography>
                    </Box>
                    <Box display="flex" flexDirection="row" gap={2} marginY={2} justifyContent="center">
                        <Typography>Okres wyświetlania filmu:</Typography>
                        <DatePicker
                            selected={startDate}
                            onChange={(update: [Date | null, Date | null]) => setDateRange(update)}
                            startDate={startDate}
                            endDate={endDate}
                            selectsRange
                            className="date-picker"
                        />
                    </Box>
                    <Box display="flex" flexDirection="row" gap={2} marginY={2} justifyContent="center">
                        <FormControl variant="filled" sx={{ m: 1, minWidth: "126px" }}>
                            <InputLabel id="demo-simple-select-filled-label">Godzina</InputLabel>
                            <Select
                                labelId="demo-simple-select-filled-label"
                                id="demo-simple-select-filled"
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                            >
                                {hours.map((type) =>
                                    <MenuItem key={type} value={type}>{type}</MenuItem>
                                )}
                            </Select>
                        </FormControl>
                        <FormControl variant="filled" sx={{ m: 1, minWidth: "126px" }}>
                            <InputLabel id="demo-simple-select-filled-label">Sala kinowa</InputLabel>
                            <Select
                                labelId="demo-simple-select-filled-label"
                                id="demo-simple-select-filled"
                                value={cinemaHallNumber ? cinemaHallNumber.toString() : ""}
                                onChange={(e) => setCinemaHallNumber(parseInt(e.target.value))}
                            >
                                {Array.from(cinemaHalls).map((type) =>
                                    <MenuItem key={type} value={type}>{type}</MenuItem>
                                )}
                            </Select>
                        </FormControl>
                    </Box>
                    <Box display="flex" flexDirection="row" gap={2} justifyContent="center">
                        <Button onClick={handleAddRepertoire} className="button-style">Zapisz</Button>
                    </Box>
                    <MessageBox
                        isOpen={filmAdded || isError}
                        text={isError ? "Dodanie filmu nie powiodło się" : "Dodano film do repertuaru"}
                        onClose={() => navigate("/")}
                        isError={isError}
                    />
                    <ChooseFilm
                        isOpen={isChooseFilmClicked}
                        onClose={()=>setIsChooseFilmClicked(false)}
                        setFilmTitle={setFilmTitle}
                    />
                </Box>
            </Modal>
        </div>
    );
}

export default NewRepertoireForm;