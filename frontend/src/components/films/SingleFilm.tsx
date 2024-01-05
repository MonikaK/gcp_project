import {Box, Button, Stack, Typography} from "@mui/material";

/**
 * Function representing the component responsible for displaying a tile of single film.
 */
const SingleFilm = ({
                        filmTitle,
                        director,
                        year,
                        language,
                        subtitles,
                        genre,
                        type,
                        duration,
                        description,
                        setFilmTitle,
                        onClose
}:{
    filmTitle: string,
    director: string,
    year: number,
    language: string,
    subtitles: boolean,
    genre: string,
    type: string,
    duration: number,
    description: string,
    setFilmTitle: (value: string) => void;
    onClose: () => void;
}) => {
    const filmCover = `${process.env.PUBLIC_URL}/${filmTitle.replaceAll(".", "")
        .replaceAll(" ", "-")}.jpg`;

    /**
     * Function handling the film choice, then the modal with list of films is closed and chosen film title is set.
     */
    const handleChooseFilm = () => {
        setFilmTitle(filmTitle);
        onClose();
    }

    return (
        <div>
            <Box
                sx={{
                    padding: 2,
                    backgroundColor: "rgba(231,226,182,0.8)",
                    marginY: 2,
                    width: 700,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                <Box
                    component="img"
                    sx={{ height: 150, width: 150 }}
                    alt="film cover"
                    src={filmCover}
                />
                <Stack sx={{marginLeft: 3, textAlign: "left"}}>
                    <Box display="flex" justifyContent="space-between">
                        <Typography fontSize={22} marginBottom={2}>Tytuł filmu: <strong>{filmTitle}</strong></Typography>
                        <Typography fontSize={22}>{duration} minut</Typography>
                        <Button onClick={handleChooseFilm} className="button-style">Wybierz</Button>
                    </Box>
                    <Typography fontSize={20}>Reżyser: {director}</Typography>
                    <Typography fontSize={20}>Rok wydania: {year}</Typography>
                    <Box display="flex" flexDirection="row" gap={2}>
                        <Typography fontSize={20}>Język: {language}</Typography>
                        {subtitles &&
                            <Typography fontSize={20}>Napisy: PL</Typography>
                        }
                    </Box>
                    <Box display="flex" flexDirection="row" gap={2}>
                        <Typography fontSize={20}>Gatunek: {genre}</Typography>
                        <Typography fontSize={20}>Typ seansu: {type}</Typography>
                    </Box>
                    <Typography fontSize={20} marginTop={2}>Opis: {description}</Typography>
                </Stack>
            </Box>
        </div>
    );
}

export default SingleFilm;
