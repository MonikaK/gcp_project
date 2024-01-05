import {
    Box,
    Button,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Modal,
    Select,
    Switch
} from "@mui/material";
import {Input} from "../utils/Input";
import {useState} from "react";
import MessageBox from "../utils/MessageBox";
import {fetchAddFilm, Film} from "./filmsFetch";

/**
 * Function representing the component responsible for displaying a form for adding a new film.
 */
const NewFilmForm = ({modalOpened, onClose}:{modalOpened: boolean; onClose: ()=>void}) => {
    const [filmTitle, setFilmTitle] = useState("");
    const [director, setDirector] = useState("");
    const [year, setYear] = useState(Number());
    const [language, setLanguage] = useState("");
    const [subtitles, setSubtitles] = useState(false);
    const [genre, setGenre] = useState("");
    const [type, setType] = useState("");
    const [duration, setDuration] = useState(Number());
    const [description, setDescription] = useState("");
    const genres = ["komedia", "dramat", "przygodowy", "horror", "thriller", "fantasy"];
    const types = ["2D", "3D"];
    const [isError, setIsError] = useState(false);
    const [filmAdded, setFilmAdded] = useState(false);

    /**
     * Function mapping input values from the form to Film object to send it to backend.
     *
     * @return Mapped Film object
     */
    const mapToFilm = () => {
        return {
            title: filmTitle,
            director: director,
            year: year,
            language: language,
            subtitles: subtitles,
            genre: genre,
            type: type,
            duration: duration,
            description: description,
        } as Film;
    }

    /**
     * Function handling the addition of a new film, then displays success/failure info and refreshes page with new
     * film added.
     */
    const handleAddFilm = () => {
        fetchAddFilm(mapToFilm())
            .then(() => {
                setFilmAdded(true);
                setIsError(false);
            })
            .catch(() => setIsError(true))
    }

    return (
        <div>
            <Modal open={modalOpened} onClose={onClose} className="modal" sx={{marginTop: "40px"}}>
                <Box sx={{
                    alignContent: "center",
                    alignItems: "center",
                    border: "2px solid black",
                    borderRadius: 3,
                    padding: 2,
                    backgroundColor: "rgba(231,226,182,1)" ,
                    marginY: 2,
                }}>
                    <Box display="flex" flexDirection="row" gap={2}>
                        <Input
                            label="Tytuł filmu"
                            value={filmTitle}
                            onChange={(value: string) => setFilmTitle(value)}
                            sx={{width: "370px"}}
                        />
                        <Input
                            label="Reżyser"
                            value={director}
                            onChange={(value: string) => setDirector(value)}
                            sx={{width: "300px"}}
                        />
                    </Box>
                    <Box display="flex" flexDirection="row" gap={2}>
                        <Input
                            label="Rok wydania"
                            value={year.toString()}
                            onChange={(value: string) => setYear(parseInt(value))}
                        />
                        <Input
                            label="Czas trwania (min)"
                            value={duration.toString()}
                            onChange={(value: string) => setDuration(parseInt(value))}
                        />
                        <Input
                            label="Język seansu"
                            value={language}
                            onChange={(value: string) => setLanguage(value)}
                        />
                    </Box>
                    <Box display="flex" flexDirection="row" justifyContent="space-between">
                        <FormControl variant="filled" sx={{ m: 1, minWidth: "110px" }}>
                            <InputLabel id="demo-simple-select-filled-label">Gatunek</InputLabel>
                            <Select
                                labelId="demo-simple-select-filled-label"
                                id="demo-simple-select-filled"
                                value={genre}
                                onChange={(e) => setGenre(e.target.value)}
                            >
                                {genres.map((genre) =>
                                    <MenuItem key={genre} value={genre}>{genre}</MenuItem>
                                )}
                            </Select>
                        </FormControl>
                        <FormControl variant="filled" sx={{ m: 1, minWidth: "122px" }}>
                            <InputLabel id="demo-simple-select-filled-label">Typ seansu</InputLabel>
                            <Select
                                labelId="demo-simple-select-filled-label"
                                id="demo-simple-select-filled"
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                            >
                                {types.map((type) =>
                                    <MenuItem key={type} value={type}>{type}</MenuItem>
                                )}
                            </Select>
                        </FormControl>
                        <FormControlLabel
                            value={subtitles}
                            control={<Switch color="primary" />}
                            label="Napisy"
                            labelPlacement="top"
                            onChange={(event, checked) => setSubtitles(checked)}
                        />
                    </Box>
                    <Input
                        label="Opis filmu"
                        value={description}
                        onChange={(value: string) => setDescription(value)}
                    />
                    <Box display="flex" flexDirection="row" justifyContent="center">
                        <Button onClick={handleAddFilm} className="button-style">Zapisz</Button>
                    </Box>
                    <MessageBox
                        isOpen={filmAdded || isError}
                        text={isError ? "Dodanie filmu nie powiodło się" : "Dodano nowy film"}
                        onClose={onClose}
                        isError={isError}
                    />
                </Box>
            </Modal>
        </div>
    );
}

export default NewFilmForm;