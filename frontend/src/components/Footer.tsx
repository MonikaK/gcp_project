import {Typography} from "@mui/material";

/**
 * Function representing the component responsible for displaying a footer section.
 */
const Footer = () => {
    return (
        <div id="footer">
            <Typography
                fontSize={22}
                marginTop="1%"
                color="rgba(231,226,182,0.8)"
            >Autor: Monika Kidawska</Typography>
        </div>
    );
}

export default Footer;