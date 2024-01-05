import {Box, CircularProgress, Typography} from "@mui/material";

/**
 * Function representing the component responsible for displaying a loading spinner.
 */
const Loading = () => (
    <Box sx={{
        alignContent: "center",
        border: "2px solid black",
        borderRadius: 3,
        padding: 2,
        backgroundColor: "rgba(231,226,182,0.9)",
        marginY: 2
    }}>
        <CircularProgress size="8rem" sx={{color:"black"}}/>
        <Typography sx={{mt: 2, fontSize: 18}}>
            Ładowanie
        </Typography>
    </Box>
);

export default Loading;