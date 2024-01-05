import {FETCH_URL} from "../utils/fetchUrl";
import {TicketType} from "./Tickets";

/**
 * Async function managing new ticket type addition by calling from backend method POST on endpoint /tickets/add
 * with bearer token.
 *
 * @param type New ticket type to be added
 */
export const fetchAddTicketType = async (type: string) : Promise<void> => {
    try {
        const jwt = localStorage.getItem("sessionToken");
        if (jwt) {
            const response = await fetch(FETCH_URL + "tickets/add", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + jwt
                },
                method: "POST",
                body: JSON.stringify(type)
            });
            if (response.status === 400) {
                return Promise.reject();
            }
        }
        else {
            return Promise.reject();
        }
    } catch (err) {
        console.log(err);
    }
}

/**
 * Async function managing getting a list of ticket types by calling from backend method GET on endpoint /tickets/list
 * with bearer token.
 */
export const fetchGetTicketTypes = async () : Promise<TicketType[]> => {
    let tickets: TicketType[] = [];
    try {
        const jwt = localStorage.getItem("sessionToken");
        if (jwt) {
            const response = await fetch(FETCH_URL + "tickets/list", {
                headers: {
                    "Authorization": "Bearer " + jwt
                }
            });
            if (response.ok) {
                tickets = await response.json();
                return tickets;
            }
        }
        else {
            return Promise.reject();
        }
    } catch (err) {
        console.log(err);
        throw err;
    }
    return tickets;
}