import React, {createContext, useEffect, useState} from 'react';
import {Routes, Route, BrowserRouter} from "react-router-dom";
import './App.css';
import Header from "./components/Header";
import Repertoire from "./components/repertoire/RepertoirePage";
import Login from "./components/auth/Login";
import Signup, {User} from "./components/auth/Signup";
import './pageStyle.css';
import Footer from "./components/Footer";
import Reservations from "./components/reservations/Reservations";
import AdminPage from "./components/admin/AdminPage";
import Logout from "./components/auth/Logout";
import {LocalizationProvider} from '@mui/x-date-pickers';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {fetchUser} from "./components/auth/fetchAuth";

export type SessionInfoContextType = {
    loggedIn: boolean;
    setLoggedIn: (value: boolean)=>void;
    user?: User;
    setUser: (value: User)=>void;
};

export const SessionInfoContext = createContext<SessionInfoContextType>({} as unknown as SessionInfoContextType);

const App = () => {
    const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("sessionToken"));
    const [user, setUser] = useState<User>();

    useEffect(() => {
        fetchUser(localStorage.getItem("userId") || "")
            .then((res) => res && setUser(res))
            .catch((err) => console.log(err));
    }, []);


    return (
        <div className="App" id="home">
            <SessionInfoContext.Provider value={{loggedIn, setLoggedIn, user, setUser}}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <BrowserRouter>
                        <Header/>
                        <Routes>
                            <Route path="/" element={<Repertoire/>}/>
                            <Route path="/repertoire" element={<Repertoire/>}/>
                            <Route path="/reservations" element={<Reservations/>}/>
                            <Route path="/admin" element={<AdminPage/>}/>
                            <Route path="/login" element={<Login />}/>
                            <Route path="/logout" element={<Logout/>}/>
                            <Route path="/signup" element={<Signup/>}/>
                        </Routes>
                        <Footer/>
                    </BrowserRouter>
                </LocalizationProvider>
            </SessionInfoContext.Provider>
        </div>
    );
}

export default App;
