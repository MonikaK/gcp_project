import {Box, Button, styled} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useContext, useEffect} from "react";
import {SessionInfoContext} from "../App";

/**
 * Function representing the component responsible for displaying a header section. It manages the navigation between
 * pages.
 */
const Header = () => {
    const navigate = useNavigate();
    const {loggedIn, setLoggedIn, user} = useContext(SessionInfoContext);

    useEffect(() => {
        setLoggedIn(!!localStorage.getItem("sessionToken"));
    }, []);

    return (
        <div id="header">
            <Box sx={{alignContent: "center", display: "flex", gap: 5, marginX: 5}}>
                <HeaderButton onClick={() => navigate('/repertoire')}>Repertuar</HeaderButton>
                {loggedIn && <HeaderButton onClick={() => navigate('/reservations')}>Rezerwacje</HeaderButton>}
                {loggedIn && user?.admin &&
                    <HeaderButton onClick={() => navigate('/admin')}>Panel administratora</HeaderButton>
                }
                {loggedIn ?
                    <HeaderButton onClick={() => navigate('/logout', {state: {logout: true}})}>Log out</HeaderButton> :
                    <HeaderButton onClick={() => navigate('/login')}>Log in</HeaderButton>
                }
            </Box>
        </div>
);
}

const HeaderButton = styled(Button) `
    background: rgb(168, 136, 2);
    color: white;
    border: 1px solid rgb(168, 136, 2);
    border-radius: 3px;
    height: fit-content;
    margin-top: 3%;
`;

export default Header;