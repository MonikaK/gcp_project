import {FETCH_URL} from "../utils/fetchUrl";
import {SessionInfo} from "./Login";
import {User} from "./Signup";

/**
 * Async function managing logging user in by calling from backend method POST on endpoint /login with basic auth.
 *
 * @param username User's login
 * @param password User's password
 * @return SessionInfo object
 */
export const fetchLogIn = async (username: string, password: string) : Promise<SessionInfo> => {
    let sessionInfo;
    try {
        const response = await fetch(FETCH_URL + "login", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Basic " + btoa(username + ":" + password)
            },
            method: "POST"
        });

        if (response.ok) {
            sessionInfo = await response.json();
            localStorage.setItem('sessionToken', sessionInfo.token);
            localStorage.setItem('userId', sessionInfo.id);
            return sessionInfo;
        }

        if (response.status === 400) {
            return Promise.reject();
        }
    } catch (err) {
        console.log(err);
    }
    return sessionInfo;
}

/**
 * Async function managing getting user info by calling from backend method GET on endpoint /users/{userId}
 * with bearer token.
 *
 * @param userId User's id
 * @return User object retrieved from backend
 */
export const fetchUser = async (userId?: string) : Promise<User | null> => {
    let user = null;
    if(userId) {
        try {
            const jwt = localStorage.getItem("sessionToken");
            if (jwt) {
                const response = await fetch(FETCH_URL + "users/" + userId, {
                    headers: {
                        "Authorization": "Bearer " + jwt
                    }
                });
                if (response.ok) {
                    user = await response.json();
                    return user;
                }
            }
            else {
                return Promise.reject();
            }
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
    return user;
}

/**
 * Async function managing adding new user by calling from backend method POST on endpoint /users/add.
 *
 * @param user User object to add
 */
export const fetchAddUser = async (user: User) : Promise<void> => {
    try {
        await fetch(FETCH_URL + "users/add", {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(user)
        });
    } catch (err) {
        console.log(err);
        throw err;
    }
}

/**
 * Async function managing logging user out by calling from backend method GET on endpoint /logout
 * with bearer token.
 */
export const fetchLogOut = async () : Promise<void> => {
    try {
        const jwt = localStorage.getItem("sessionToken");
        if (jwt) {
            fetch(FETCH_URL + "logout", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + jwt
                },
                method: "GET",
                mode: "no-cors"
            }).then(() => localStorage.removeItem('sessionToken'))
                .catch(() => Promise.reject());
        }
    } catch (err) {
        console.log(err);
    }
}