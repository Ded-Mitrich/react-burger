import { apiBaseUrl, authTokenCookieName, checkResponse, deleteCookie, fetchWithRefresh, getCookie, refreshTokenCookieName, refreshTokens, setTokens } from "../../utils/utils";
import { AppDispatch, AppThunk } from "../store";
import {
    forgotPasswordFailed,
    forgotPasswordSuccessful,
    setUser,
    resetPasswordSuccessful,
    resetPasswordFailed,
    getUserReguest,
    getUserFailed,
} from "./action-creators";

export const login: AppThunk = (form: { email: string, password: string }) => (dispatch: AppDispatch) => {

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

export const register: AppThunk = (form: { email: string, password: string }) => (dispatch: AppDispatch) => {

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

export const logout: AppThunk = () => (dispatch: AppDispatch) => {
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

export const getUser: AppThunk = () => (dispatch: AppDispatch) => {

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

export const forgotPassword: AppThunk = (form: { email: string }) => (dispatch: AppDispatch) => {
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

export const resetPassword: AppThunk = (form: { password: string, token: string }) => (dispatch: AppDispatch) => {
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

export const updateUser: AppThunk = (form: { email: string, password: string, name: string }) => (dispatch: AppDispatch) => {

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





