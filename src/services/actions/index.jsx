import { deleteCookie, getCookie, setCookie } from "../../utils/utils";
import {
    avalaibleIngredientsRequest,
    clearIngredients,
    makeOrderFailure,
    sendOrderRequest,
    sendOrderSuccessful,
    setAvalaibleIngredients,
    setAvalaibleIngredientsFailed,
    forgotPasswordFailed,
    forgotPasswordSuccessful,
    setUser,
    resetPasswordSuccessful,
    resetPasswordFailed,
    getUserReguest,
    getUserFailed
} from "./action-creators";

const apiBaseUrl = 'https://norma.nomoreparties.space/api';
const authTokenCookieName = 'authToken';
const refreshTokenCookieName = 'refreshToken';

function checkResponse(res) {
    if (res.ok) {
        return res;
    }
    return Promise.reject(res.status);
}

function setTokens(res) {
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

function refreshTokens() {
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

const fetchWithRefresh = async (url, options) => {
    const res = await fetch(url, options);

    if (res.ok) {
        return res.json();
    }

    const json = await res.json();

    if (json.message === "jwt expired") {
        const tokens = refreshTokens();

        if (!tokens) {
            return Promise.reject(res.status);
        }

        options.headers.Authorization = tokens.accessToken;

        const res = await fetch(url, options);
        return res.ok ? res.json() : Promise.reject(res.status);
    } else {
        return json;
    }
};

export function login(form) {
    return function (dispatch) {
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
                }
                else {
                    console.log(res.message);
                }
            }).catch(err => {
                console.log(err.message);
            })
    }
}

export function register(form) {
    return function (dispatch) {
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
    return function (dispatch) {
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
    return function (dispatch) {
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
                        dispatch(setUser({ email: res.user.email, name: res.user.name }));
                    }
                    else {
                        dispatch(getUserFailed(res.message));
                    }
                }).catch(err => {
                    dispatch(getUserFailed(err.message));
                })
        }
        else {
            const refToken = refreshTokens();
            if (refToken) {
                getUser();
            }
            else {
                dispatch(getUserFailed('there are no tokens'));
            }
        }
    }
}

export function forgotPassword(form) {
    return function (dispatch) {
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
                    dispatch(forgotPasswordFailed(res.message));
                }
            }).catch(err => {
                dispatch(forgotPasswordFailed(err.message));
            })
    }
}

export function resetPassword(form) {
    return function (dispatch) {
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
                    dispatch(resetPasswordFailed(res.message));
                }
            }).catch(err => {
                dispatch(resetPasswordFailed(err.message));
            })
    }
}


export function updateUser(form) {
    return function (dispatch) {
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
                    dispatch(setUser({ email: res.user.email, name: res.user.name }));
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
    return function (dispatch) {
        dispatch(avalaibleIngredientsRequest());
        fetch(apiBaseUrl + '/ingredients', { method: 'GET' })
            .then(checkResponse)
            .then(res => res.json())
            .then(res => {
                dispatch(setAvalaibleIngredients(res.data))
            }).catch(err => {
                dispatch(setAvalaibleIngredientsFailed(err))
            })
    }
}

export function sendOrder(items) {
    return function (dispatch) {
        dispatch(sendOrderRequest());
        fetch(apiBaseUrl + '/orders', {
            method: 'POST',
            body: JSON.stringify({ ingredients: items.map((elem) => elem._id) }),
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(checkResponse)
            .then(res => res.json())
            .then(res => {
                if (res.success) {
                    dispatch(sendOrderSuccessful({ name: res.name, number: res.order.number }));
                    dispatch(clearIngredients());
                }
                else {
                    dispatch(makeOrderFailure(res.message));
                }
            }).catch(err => {
                dispatch(makeOrderFailure(err.message));
            })
    }
}






