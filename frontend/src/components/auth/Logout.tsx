import {useContext, useEffect, useRef, useState} from "react";
import {SessionInfoContext} from "../../App";
import MessageBox from "../utils/MessageBox";
import {useLocation, useNavigate} from "react-router-dom";
import {fetchLogOut} from "./fetchAuth";

/**
 * Function representing the component responsible for managing logging out.
 */
const Logout = () => {
    const navigate = useNavigate();
    const {setLoggedIn} = useContext(SessionInfoContext);
    const isFetched = useRef(false);
    const [loggedOut, setLoggedOut] = useState(false);
    const [isError, setIsError] = useState(false);
    const logOutClicked = useLocation().state.logout;

    /** Fetch log out when component mounts, then info about success/failure is displayed and user is navigated
     to Login page. */
    useEffect(() => {
        if(!isFetched.current && logOutClicked) {
            fetchLogOut()
                .then((response) => {
                    setLoggedIn(false);
                    setLoggedOut(true);
                    isFetched.current = true;
                })
                .catch(() => setIsError(true));
        }
    }, []);

    return (
        <div>
            <MessageBox
                isOpen={loggedOut || isError}
                text={isError ? "Wylogowanie nie powiodło się" : "Wylogowano użytkownika"}
                onClose={() => navigate("/login")}
                isError={isError}
            />
        </div>
    );
}

export default Logout;