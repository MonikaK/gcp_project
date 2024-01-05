import {useEffect, useRef, useState} from "react";
import {Box, Button, Typography} from "@mui/material";
import {Input} from "../utils/Input";
import MessageBox from "../utils/MessageBox";
import {fetchAddTicketType, fetchGetTicketTypes} from "./fetchTickets";

export interface TicketType {
    ticketTypeId: string;
    ticketType: string;
}

/**
 * Function representing the component responsible for managing ticket types.
 */
const Tickets = () => {
    const [ticketTypes, setTicketTypes] = useState<TicketType[]>();
    const areTicketTypesFetched = useRef(false);
    const [newType, setNewType] = useState("");
    const [isError, setIsError] = useState(false);
    const [ticketAdded, setTicketAdded] = useState(false);
    const [reload, setReload] = useState(false);

    /** Fetch ticket types when component mounts. */
    useEffect(() => {
        if(!areTicketTypesFetched.current) {
            fetchGetTicketTypes()
                .then((response) => {
                    setTicketTypes(response);
                    areTicketTypesFetched.current = true;
                })
                .catch((err) => console.log(err));
        }
    }, [reload]);

    /**
     * Function handling the addition of a new ticket type, then refreshes page and displays new list of ticket types.
     * @param type The new ticket type to be added.
     */
    const handleAddTicketType = (type: string) => {
        if(type !== "") {
            fetchAddTicketType(type)
                .then(() => {
                    setTicketAdded(true);
                    setIsError(false);
                    setReload(!reload);
                })
                .catch(() => setIsError(true));
        }
    }

    return (
        <Box
            display="flex"
            alignItems="center"
            flexDirection="column"
            sx={{
                alignContent: "center",
                border: "2px solid black",
                borderRadius: 3,
                padding: 2,
                backgroundColor: "rgba(231,226,182,0.8)",
                marginY: 2,
                width: 550,
        }}>
            <Typography fontSize={22} marginBottom={2}>Typy biletów:</Typography>
            {ticketTypes && ticketTypes.map((ticket) => (
                    <Typography key={ticket.ticketTypeId} fontSize={20}>
                        {ticket.ticketTypeId}. {ticket.ticketType}
                    </Typography>
                )
            )}
            <Box display="flex" flexDirection="row" gap={2}>
                <Input
                    label="Nowy typ"
                    value={newType}
                    onChange={(value: string) => setNewType(value)}
                    sx={{width: "370px"}}
                />
                <Button onClick={() => handleAddTicketType(newType)}
                        className="button-style"
                        sx={{marginTop: 8}}
                >Dodaj</Button>
                <MessageBox
                    isOpen={ticketAdded || isError}
                    text={isError ? "Dodanie typu biletu nie powiodło się" : "Dodano nowy typ biletu"}
                    onClose={() => window.location.reload()}
                    isError={isError}
                />
            </Box>
        </Box>
    );
}

export default Tickets;