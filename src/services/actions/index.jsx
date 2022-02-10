import { deleteCookie, getCookie, setCookie } from "../../utils/utils";
import {
    avalaibleIngredientsRequest,
    clearIngredients,
    makeOrderFailure,
    sendOrderRequest,
    sendOrderSuccessful,
    setAvalaibleIngredients,
    setAvalaibleIngredientsFailed,
    loginRequest,
    logoutRequest,
    registerRequest,
    refreshTokenRequest,
    refreshTokenFailed,
    logoutFailed,
    registerFailed,
    resetPasswordRequest,
    forgotPasswordRequest,
    forgotPasswordFailed,
    forgotPasswordSuccessful,
    loginFailed,
    setUser,
    resetPasswordSuccessful,
    resetPasswordFailed,
    updateUserRequest,
    updateUserFailed,
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
    let authToken;
    if (res.accessToken.indexOf('Bearer') === 0) {
        authToken = res.accessToken.split('Bearer ')[1];
        if (authToken) {
            setCookie(authTokenCookieName, authToken, { expires: 1200 });
        }
    }

    if (res.refreshToken) {
        setCookie(refreshTokenCookieName, res.refreshToken, { expires: 1200 });
    }
}

export function login(form) {
    return function (dispatch) {
        dispatch(loginRequest());
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
                    dispatch(loginFailed(res.message));
                }
            }).catch(err => {
                dispatch(loginFailed(err.message));
            })
    }
}

export function register(form) {
    return function (dispatch) {
        dispatch(registerRequest());
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
                    dispatch(registerFailed(res.message));
                }
            }).catch(err => {
                dispatch(registerFailed(err.message));
            })
    }
}

export function logout() {
    return function (dispatch) {
        dispatch(logoutRequest());
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
                    dispatch(logoutFailed(res.message));
                }
            }).catch(err => {
                dispatch(logoutFailed(err.message));
            })
    }
}

export function getUser() {
    return function (dispatch) {
        dispatch(getUserReguest());
        const authToken = getCookie(authTokenCookieName);
        if (authToken) {
            fetch(apiBaseUrl + '/auth/user', {
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
                .then(checkResponse)
                .then(res => res.json())
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
    }
}

export function forgotPassword(form) {
    return function (dispatch) {
        dispatch(forgotPasswordRequest());
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
        dispatch(resetPasswordRequest());
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

export function refreshToken() {
    return function (dispatch) {
        dispatch(refreshTokenRequest());
        const token = getCookie(refreshTokenCookieName);
        fetch(apiBaseUrl + '/auth/token', {
            method: 'POST',
            body: JSON.stringify({ token: { token } }),
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
                    dispatch(refreshTokenFailed(res.message));
                }
            }).catch(err => {
                dispatch(refreshTokenFailed(err.message));
            })
    }
}

export function updateUser(form) {
    return function (dispatch) {
        dispatch(updateUserRequest());
        const authToken = getCookie(authTokenCookieName);
        fetch(apiBaseUrl + '/auth/user', {
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
            .then(checkResponse)
            .then(res => res.json())
            .then(res => {
                if (res.success) {
                    dispatch(setUser({ email: res.user.email, name: res.user.name }));
                }
                else {
                    dispatch(updateUserFailed(res.message));
                }
            }).catch(err => {
                dispatch(updateUserFailed(err.message));
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






