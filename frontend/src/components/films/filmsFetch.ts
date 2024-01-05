import {FETCH_URL} from "../utils/fetchUrl";

export interface Film {
    title: string;
    director: string;
    year: number;
    language: string;
    subtitles: boolean;
    genre: string,
    type: string;
    duration: number;
    description: string;
}

/**
 * Async function managing new film addition by calling from backend method POST on endpoint /films/add
 * with bearer token.
 *
 * @param film Film object to be added
 */
export const fetchAddFilm = async (film: Film) : Promise<void> => {
    try {
        const jwt = localStorage.getItem("sessionToken");
        if (jwt) {
            const response = await fetch(FETCH_URL + "films/add", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + jwt
                },
                method: "POST",
                body: JSON.stringify(film)
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
 * Async function managing getting all films by calling from backend method GET on endpoint /films/list
 * with bearer token.
 *
 * @return List of Film objects retrieved from backend
 */
export const fetchFilms = async () : Promise<Film[]> => {
    let films : Film[] = [];
    try {
        const jwt = localStorage.getItem("sessionToken");
        if (jwt) {
            const response = await fetch(FETCH_URL + "films/list", {
                headers: {
                    "Authorization": "Bearer " + jwt
                }
            });
            if (response.ok) {
                films = await response.json();
                return films;
            }
        }
        else {
            return Promise.reject();
        }
    } catch (err) {
        console.log(err);
        throw err;
    }
    return films;
}

/**
 * Async function managing getting single film by calling from backend method GET on endpoint /films/{title}
 * with bearer token.
 *
 * @param title of the film to search for
 */
export const fetchFilm = async (title: string) : Promise<Film | null> => {
    let film = null;
    try {
        const jwt = localStorage.getItem("sessionToken");
        if (jwt) {
            const response = await fetch(FETCH_URL + "films/" + title, {
                headers: {
                    "Authorization": "Bearer " + jwt
                }
            });
            if (response.ok) {
                film = await response.json();
                return film;
            }
        }
        else {
            return Promise.reject();
        }
    } catch (err) {
        console.log(err);
        throw err;
    }
    return film;
}