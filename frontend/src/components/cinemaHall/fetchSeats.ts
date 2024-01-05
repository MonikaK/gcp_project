import {FETCH_URL} from "../utils/fetchUrl";
import {Seat} from "../reservations/ReservationForm";

/**
 * Async function managing getting all seats from cinema halls by calling from backend method GET on endpoint /seats/list
 * with bearer token.
 *
 * @return List of Seat objects retrieved from backend
 */
export const fetchGetSeats = async () : Promise<Seat[]> => {
    let seats : Seat[] = [];
    try {
        const jwt = localStorage.getItem("sessionToken");
        if (jwt) {
            const response = await fetch(FETCH_URL + "seats/list", {
                headers: {
                    "Authorization": "Bearer " + jwt
                }
            });
            if (response.ok) {
                seats = await response.json();
                return seats;
            }
        }
        else {
            return Promise.reject();
        }
    } catch (err) {
        console.log(err);
        throw err;
    }
    return seats;
}

/**
 * Async function managing getting all occupied seats for given film by calling from backend method GET on endpoint
 * /reservations/{filmTitle}/{filmDate} with bearer token.
 *
 * @param filmTitle Title of the film for which occupied seats are to search
 * @param filmDate Date of the film for which occupied seats are to search
 * @return List of Seat objects retrieved from backend
 */
export const fetchGetOccupiedSeatsByFilm = async (filmTitle: string, filmDate: string) : Promise<Seat[]> => {
    let seats : Seat[] = [];
    try {
        const jwt = localStorage.getItem("sessionToken");
        if (jwt) {
            const response = await fetch(FETCH_URL + "reservations/" + filmTitle + "/" + filmDate, {
                headers: {
                    "Authorization": "Bearer " + jwt
                }
            });
            if (response.ok) {
                seats = await response.json();
                return seats;
            }
        }
        else {
            return Promise.reject();
        }
    } catch (err) {
        console.log(err);
        throw err;
    }
    return seats;
}