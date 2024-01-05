import {Repertoire} from "./SingleRepertoire";
import {FETCH_URL} from "../utils/fetchUrl";
import {RepertoireResponse} from "./RepertoirePage";

/**
 * Async function managing getting all repertoire by calling from backend method GET on endpoint /repertoire/list.
 *
 * @return List of RepertoireResponse objects retrieved from backend
 */
export const fetchRepertoire = async () : Promise<RepertoireResponse[]> => {
    let repertoires : RepertoireResponse[] = [];
    try {
        const response = await fetch(FETCH_URL + "repertoire/list");
        if (response.ok) {
            repertoires = await response.json();
            return repertoires;
        }
    } catch (err) {
        console.log(err);
        throw err;
    }
    return repertoires;
}

/**
 * Async function managing new repertoire addition by calling from backend method POST on endpoint /repertoire/add
 * with bearer token.
 *
 * @param repertoire Repertoire object to be added
 */
export const fetchAddRepertoire = async (repertoire: Repertoire) : Promise<void> => {
    try {
        const jwt = localStorage.getItem("sessionToken");
        if (jwt) {
            const response = await fetch(FETCH_URL + "repertoire/add", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + jwt
                },
                method: "POST",
                body: JSON.stringify(repertoire)
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