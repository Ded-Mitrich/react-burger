import { Dispatch } from "redux";
import { IIngredientAction, IOrdersAction, IUserAction, IWebSocketAction, TBurgerIngredient } from "../../utils/types";
import { authTokenCookieName, deleteCookie, getCookie, refreshTokenCookieName, setCookie } from "../../utils/utils";
import {
    clearIngredients,
    makeOrderFailure,
    sendOrderSuccessful,
    setAvalaibleIngredients,
    forgotPasswordFailed,
    forgotPasswordSuccessful,
    setUser,
    resetPasswordSuccessful,
    resetPasswordFailed,
    getUserReguest,
    getUserFailed,
    makeOrderRequest,
    openWsOrderFeedUser
} from "./action-creators";

const apiBaseUrl = 'https://norma.nomoreparties.space/api';

function checkResponse(res: Response) {
    if (res.ok) {
        return res;
    }
    return Promise.reject(res.status);
}

function setTokens(res: { accessToken: string, refreshToken: string }) {
    if (res.accessToken.indexOf('Bearer') === 0) {
        const authToken = res.accessToken.split('Bearer ')[1];
        if (authToken) {
            setCookie(authTokenCookieName, authToken, { expires: 1200 });
        }
    }

    if (res.refreshToken) {
        setCookie(refreshTokenCookieName, res.refreshToken, { expires: 31536000 });
    }
}

function refreshTokens(): { accessToken: string, refreshToken: string } | null | undefined {
    const token = getCookie(refreshTokenCookieName);
    if (token) {
        fetch(apiBaseUrl + '/auth/token', {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({ token: token }),
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
        })
            .then(checkResponse)
            .then(res => res.json())
            .then(res => {
                if (res.success) {
                    setTokens(res);
                    return { accessToken: res.accessToken, refreshToken: res.refreshToken };
                }
                else {
                    return null;
                }
            }).catch(err => {
                console.log(err);
                return null;
            })
    }
    else return null;
}

async function fetchWithRefresh(url: string, options: RequestInit) {
    let res = await fetch(url, options);

    if (res.ok) {
        return res.json();
    }

    const json = await res.json();

    if (json.message === "jwt expired") {
        const tokens = await refreshTokens();

        if (!tokens) {
            return Promise.reject(res.status);
        }

        options.headers = { Authorization: tokens.accessToken };

        res = await fetch(url, options);
        return res.ok ? res.json() : Promise.reject(res.status);
    } else {
        return json;
    }
};

export function login(form: { email: string, password: string }) {
    return function (dispatch: Dispatch<IUserAction | IWebSocketAction>) {
        fetch(apiBaseUrl + '/auth/login', {
            method: 'POST',
            body: JSON.stringify(form),
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
        })
            .then(checkResponse)
            .then(res => res.json())
            .then(res => {
                if (res.success) {
                    setTokens(res);
                    dispatch(setUser({ email: res.user.email, name: res.user.name }));
                    dispatch(openWsOrderFeedUser());
                }
                else {
                    console.log(res.message);
                }
            }).catch(err => {
                console.log(err.message);
            })
    }
}

export function register(form: { email: string, password: string, name: string }) {
    return function (dispatch: Dispatch<IUserAction | IWebSocketAction>) {
        fetch(apiBaseUrl + '/auth/register', {
            method: 'POST',
            body: JSON.stringify(form),
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
        })
            .then(checkResponse)
            .then(res => res.json())
            .then(res => {
                if (res.success) {
                    setTokens(res);
                    dispatch(setUser({ email: res.user.email, name: res.user.name }));
                    dispatch(openWsOrderFeedUser());
                }
                else {
                    console.log(res.message);
                }
            }).catch(err => {
                console.log(err.message);
            })
    }
}

export function logout() {
    return function (dispatch: Dispatch<IUserAction>) {
        const token = getCookie(refreshTokenCookieName);
        fetch(apiBaseUrl + '/auth/logout', {
            method: 'POST',
            body: JSON.stringify({ token: token }),
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
        })
            .then(checkResponse)
            .then(res => res.json())
            .then(res => {
                if (res.success) {
                    deleteCookie(authTokenCookieName);
                    deleteCookie(refreshTokenCookieName);
                    dispatch(setUser(null));
                }
                else {
                    console.log(res.message);
                }
            }).catch(err => {
                console.log(err.message);
            })
    }
}

export function getUser() {
    return function (dispatch: Dispatch<IUserAction>) {
        const authToken = getCookie(authTokenCookieName);
        if (authToken) {
            dispatch(getUserReguest());
            fetchWithRefresh(apiBaseUrl + '/auth/user', {
                method: 'GET',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + authToken
                },
                redirect: 'follow',
                referrerPolicy: 'no-referrer',
            })
                .then(res => {
                    if (res.success) {
                        dispatch(setUser(res.user ?? null));
                    }
                    else {
                        dispatch(getUserFailed(res.message ?? ''));
                    }
                }).catch(err => {
                    dispatch(getUserFailed(err.message));
                })
        }
        else {
            if (refreshTokens()) {
                getUser();
            }
            else {
                dispatch(getUserFailed('there are no tokens'));
            }
        }
    }
}

export function forgotPassword(form: { email: string }) {
    return function (dispatch: Dispatch<IUserAction>) {
        fetch(apiBaseUrl + '/password-reset', {
            method: 'POST',
            body: JSON.stringify(form),
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
        })
            .then(checkResponse)
            .then(res => res.json())
            .then(res => {
                if (res.success) {
                    dispatch(forgotPasswordSuccessful());
                }
                else {
                    dispatch(forgotPasswordFailed());
                }
            }).catch(err => {
                dispatch(forgotPasswordFailed());
            })
    }
}

export function resetPassword(form: { password: string, token: string }) {
    return function (dispatch: Dispatch<IUserAction>) {
        fetch(apiBaseUrl + '/password-reset/reset', {
            method: 'POST',
            body: JSON.stringify(form),
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
        })
            .then(checkResponse)
            .then(res => res.json())
            .then(res => {
                if (res.success) {
                    dispatch(resetPasswordSuccessful());
                }
                else {
                    dispatch(resetPasswordFailed());
                }
            }).catch(err => {
                dispatch(resetPasswordFailed());
            })
    }
}


export function updateUser(form: { email: string, password: string, name: string }) {
    return function (dispatch: Dispatch<IUserAction>) {
        const authToken = getCookie(authTokenCookieName);
        fetchWithRefresh(apiBaseUrl + '/auth/user', {
            method: 'PATCH',
            body: JSON.stringify(form),
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + authToken
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
        })
            .then(res => {
                if (res.success) {
                    dispatch(setUser(res.user ?? null));
                }
                else {
                    console.log(res.message);
                }
            }).catch(err => {
                console.log(err.message);
            })
    }
}

export function getAvalaibleIngredients() {
    return function (dispatch: Dispatch<IIngredientAction>) {
        fetch(apiBaseUrl + '/ingredients', { method: 'GET' })
            .then(checkResponse)
            .then(res => res.json())
            .then(res => {
                dispatch(setAvalaibleIngredients(res.data))
            }).catch(err => {
                console.log(err);
            })
    }
}

export function sendOrder(items: TBurgerIngredient[]) {
    return function (dispatch: Dispatch<IOrdersAction | IIngredientAction>) {
        dispatch(makeOrderRequest());
        const authToken = getCookie(authTokenCookieName);
        fetchWithRefresh(apiBaseUrl + '/orders', {
            method: 'POST',
            body: JSON.stringify({ ingredients: items.map((elem) => elem._id) }),
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + authToken
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
        })
            .then(res => {
                if (res.success) {
                    dispatch(sendOrderSuccessful(res.order));
                    dispatch(clearIngredients());
                }
                else {
                    dispatch(makeOrderFailure(res.message ?? ''));
                }
            }).catch(err => {
                dispatch(makeOrderFailure(err.message));
            })
    }
}






