import {Box, Button} from "@mui/material";
import {useState} from "react";
import RepertoireChange from "../repertoire/RepertoireChange";
import Tickets from "./Tickets";

/**
 * Function representing the admin page allowing navigation between different sections: "Zmiana repertuaru" and "Typy biletów".
 */
const AdminPage = () => {
    const [currentTab, setCurrentTab] = useState("repertoire");
    return (
        <div>
            <Box sx={{alignContent: "center"}} className="pageBox">
                <Button onClick={() => setCurrentTab("repertoire")}
                        className="button-style"
                        sx={{marginX: 4, marginTop: 2}}
                >
                    Zmiana repertuaru
                </Button>
                <Button
                    onClick={() => setCurrentTab("tickets")}
                    className="button-style"
                    sx={{marginX: 4, marginTop: 2}}
                >
                    Typy biletów
                </Button>
                {currentTab === "repertoire" && <RepertoireChange />}
                {currentTab === "tickets" && <Tickets />}
            </Box>
        </div>
    );
}

export default AdminPage;