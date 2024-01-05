import {Box, Button} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {Input} from "../utils/Input";
import {useContext, useState} from "react";
import MessageBox from "../utils/MessageBox";
import {SessionInfoContext} from "../../App";
import {fetchLogIn, fetchUser} from "./fetchAuth";

export interface SessionInfo {
    token: string;
    id: number;
    username: string;
}

/**
 * Function representing the component responsible for displaying and managing log in form.
 */
const Login = () => {
    const {loggedIn, setLoggedIn, setUser} = useContext(SessionInfoContext);
    const navigate = useNavigate();
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [isError, setIsError] = useState(false);

    /** Function handling logging in, then info about success/failure is displayed and user is navigated
     * to main Repertoire page. */
    const handleLogIn = async () => {
        fetchLogIn(login, password)
            .then((response) => {
                setLoggedIn(!!response.token);
                setIsError(false);

                fetchUser(response.id.toString())
                    .then((res) => res && setUser(res))
                    .catch(() => setIsError(true));
            })
            .catch(() => setIsError(true));
    }

    return (
        <div>
            <Box sx={{
                alignContent: "center",
                border: "2px solid black",
                borderRadius: 3,
                padding: 2,
                backgroundColor: "rgba(231,226,182,0.8)",
                marginY: 2,
            }}>
                <Input
                    label="Login"
                    value={login}
                    onChange={(value: string) => setLogin(value)}
                />
                <Input
                    label="Hasło"
                    value={password}
                    type="password"
                    onChange={(value: string) => setPassword(value)}
                />
                <Button onClick={()=>handleLogIn()} className="button-style">Zaloguj</Button>
            </Box>
            <Button variant="text" onClick={() => navigate('/signup')} className="button-style">
                Nie posiadasz jeszcze konta? Zarejestruj się!
            </Button>
            <MessageBox
                isOpen={loggedIn || isError}
                text={isError ? "Logowanie nie powiodło się" : "Użytkownik zalogowany"}
                onClose={() => navigate("/repertoire")}
                isError={isError}
            />
        </div>
    );
}

export default Login;