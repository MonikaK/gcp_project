import {Reservation} from "./SingleReservation";
import {FETCH_URL} from "../utils/fetchUrl";

/**
 * Async function managing new reservation addition by calling from backend method POST on endpoint /reservations/add
 * with bearer token.
 *
 * @param reservation Reservation object to be added
 */
export const fetchAddReservation = async (reservation: Reservation) : Promise<void> => {
    try {
        const jwt = localStorage.getItem("sessionToken");
        if (jwt) {
            await fetch(FETCH_URL + "reservations/add", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + jwt
                },
                method: "POST",
                body: JSON.stringify(reservation)
            });
        }
        else {
            return Promise.reject();
        }
    } catch (err) {
        console.log(err);
        throw err;
    }
}

/**
 * Async function managing getting all reservations by calling from backend method GET on endpoint /reservations/list
 * with bearer token.
 *
 * @return List of Reservation objects retrieved from backend
 */
export const fetchReservations = async () : Promise<Reservation[]> => {
    let reservations : Reservation[] = [];
    try {
        const jwt = localStorage.getItem("sessionToken");
        if (jwt) {
            const response = await fetch(FETCH_URL + "reservations/list", {
                headers: {
                    "Authorization": "Bearer " + jwt
                }
            });
            if (response.ok) {
                reservations = await response.json();
                return reservations;
            }
        }
        else {
            return Promise.reject();
        }
    } catch (err) {
        console.log(err);
        throw err;
    }
    return reservations;
}

/**
 * Async function managing getting all user's reservations by calling from backend method GET on endpoint
 * /reservations/{id} with bearer token.
 *
 * @return List of user's Reservation objects retrieved from backend
 */
export const fetchReservationsByUserId = async (id: string) : Promise<Reservation[]> => {
    let reservations : Reservation[] = [];
    try {
        const jwt = localStorage.getItem("sessionToken");
        if (jwt) {
            const response = await fetch(FETCH_URL + "reservations/" + id, {
                headers: {
                    "Authorization": "Bearer " + jwt
                }
            });
            if (response.ok) {
                reservations = await response.json();
                return reservations;
            }
        }
        else {
            return Promise.reject();
        }
    } catch (err) {
        console.log(err);
        throw err;
    }
    return reservations;
}

/**
 * Async function managing deleting one reservation by calling from backend method DELETE on endpoint
 * /reservations/delete with bearer token.
 */
export const fetchDeleteReservation = async (id: string) : Promise<void> => {
    try {
        const jwt = localStorage.getItem("sessionToken");
        if (jwt) {
            const response = await fetch(FETCH_URL + "reservations/delete/" + id, {
                method: "DELETE",
                headers: {
                    "Authorization": "Bearer " + jwt
                }
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