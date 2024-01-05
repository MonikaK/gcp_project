import {Box, Button} from "@mui/material";
import {Input} from "../utils/Input";
import {useState} from "react";
import MessageBox from "../utils/MessageBox";
import {useNavigate} from "react-router-dom";
import {fetchAddUser} from "./fetchAuth";

export interface User {
    userId?: number;
    name: string;
    surname: string;
    email: string;
    phone: string;
    admin: boolean;
    login: string;
    password: string;
    repassword: string;
}

/**
 * Function representing the component responsible for displaying and managing sign up form.
 */
const Signup = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [repassword, setRepassword] = useState("");
    const [isNameError, setIsNameError] = useState(false);
    const [isSurnameError, setIsSurnameError] = useState(false);
    const [isEmailError, setIsEmailError] = useState(false);
    const [isPhoneError, setIsPhoneError] = useState(false);
    const [isLoginError, setIsLoginError] = useState(false);
    const [isPasswordError, setIsPasswordError] = useState(false);
    const [isRepasswordError, setIsRepasswordError] = useState(false);
    const [nameErrorText, setNameErrorText] = useState("");
    const [surnameErrorText, setSurnameErrorText] = useState("");
    const [emailErrorText, setEmailErrorText] = useState("");
    const [phoneErrorText, setPhoneErrorText] = useState("");
    const [loginErrorText, setLoginErrorText] = useState("");
    const [passwordErrorText, setPasswordErrorText] = useState("");
    const [repasswordErrorText, setRepasswordErrorText] = useState("");
    const [signedUp, setSignedUp] = useState(false);
    const closeModal = () => setSignedUp(false);
    const [isError, setIsError] = useState(false);

    /**
     * Function setting error message to display on info modal if any input field value is wrong.
     * @param value Input field value provided by user
     * @param charNum Input field value length
     */
    const setErrorMessage = (value: string, charNum: number) =>
        value.length < charNum ? "Minimum 3 znaki" : "Niepoprawny format";

    /**
     * Function handling setting the name value with validation.
     * @param value Input field value provided by user
     */
    const handleNameChange = (value: string) => {
        const isValid = value.match("^[A-Za-z]{3,}$");
        setName(value);
        setIsNameError(!isValid);
        setNameErrorText(setErrorMessage(value, 3));
    }

    /**
     * Function handling setting the surname value with validation.
     * @param value Input field value provided by user
     */
    const handleSurnameChange = (value: string) => {
        const isValid = value.match("^[A-Za-z]{3,}$");
        setSurname(value);
        setIsSurnameError(!isValid);
        setSurnameErrorText(setErrorMessage(value, 3));
    }

    /**
     * Function handling setting the email value with validation.
     * @param value Input field value provided by user
     */
    const handleEmailChange = (value: string) => {
        const isValid = value.match("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$");
        setEmail(value);
        setIsEmailError(!isValid);
        setEmailErrorText("Niepoprawny format");
    }

    /**
     * Function handling setting the phone value with validation.
     * @param value Input field value provided by user
     */
    const handlePhoneChange = (value: string) => {
        const isValid = value.match("^[\\+]?[0-9]{0,2}[0-9]{9}$");
        setPhone(value);
        setIsPhoneError(!isValid);
        setPhoneErrorText(setErrorMessage(value, 9));
    }

    /**
     * Function handling setting the login value with validation.
     * @param value Input field value provided by user
     */
    const handleLoginChange = (value: string) => {
        setLogin(value);
        setIsLoginError(value.length<3);
        setLoginErrorText("Minimum 3 znaki");
    }

    /**
     * Function handling setting the password value with validation.
     * @param value Input field value provided by user
     */
    const handlePasswordChange = (value: string) => {
        setPassword(value);
        setIsPasswordError(value.length<3);
        setPasswordErrorText("Minimum 3 znaki");
    }

    /**
     * Function handling setting the retyped password value with validation.
     * @param value Input field value provided by user
     */
    const handleRepasswordChange = (value: string) => {
        setRepassword(value);
        setIsRepasswordError(value !== password);
        setRepasswordErrorText("Podane hasła się różnią");
    }

    /**
     * Function handling the new user addition (signing up), then navigates user to Login page.
     */
    const handleAddUser = () => {
        const userData = {name, surname, email, phone, login, password, repassword} as User;
        fetchAddUser(userData)
            .then(() => {
                setIsError(false);
                navigate("/login");
            })
            .catch(() => setIsError(true));
        setSignedUp(true);
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
                width: 400
            }}>
                <Input
                    label="Imię"
                    value={name}
                    onChange={(value: string) => handleNameChange(value)}
                    error={isNameError}
                    helperText={isNameError ? nameErrorText : ""}
                />
                <Input
                    label="Nazwisko"
                    value={surname}
                    onChange={(value: string) => handleSurnameChange(value)}
                    helperText={isSurnameError ? surnameErrorText : ""}
                />
                <Input
                    label="E-mail"
                    value={email}
                    onChange={(value: string) => handleEmailChange(value)}
                    helperText={isEmailError ? emailErrorText : ""}
                />
                <Input
                    label="Nr telefonu"
                    value={phone}
                    onChange={(value: string) => handlePhoneChange(value)}
                    helperText={isPhoneError ? phoneErrorText : ""}
                />
                <Input
                    label="Login"
                    value={login}
                    onChange={(value: string) => handleLoginChange(value)}
                    helperText={isLoginError ? loginErrorText : ""}
                />
                <Input
                    label="Hasło"
                    value={password}
                    type="password"
                    onChange={(value: string) => handlePasswordChange(value)}
                    helperText={isPasswordError ? passwordErrorText : ""}
                />
                <Input
                    label="Powtórz hasło"
                    value={repassword}
                    type="password"
                    onChange={(value: string) => handleRepasswordChange(value)}
                    helperText={isRepasswordError ? repasswordErrorText : ""}
                />
                <Button onClick={()=>handleAddUser()} className="button-style">Zarejestruj</Button>
            </Box>
            <MessageBox
                isOpen={signedUp || isError}
                text={isError ? "Rejestracja nie powiodła się" : "Zarejestrowano użytkownika"}
                onClose={closeModal}
                isError={isError}/>
        </div>
    );
}

export default Signup;