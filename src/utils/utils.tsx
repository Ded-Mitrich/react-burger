import { TOrderStatus } from "./types";

export const authTokenCookieName = 'authToken';
export const refreshTokenCookieName = 'refreshToken';
export const apiBaseUrl = 'https://norma.nomoreparties.space/api';
export const wsBaseUrl = 'wss://norma.nomoreparties.space/orders';

export function getCookie(name: string) {
    const matches = document.cookie.match(
        new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function setCookie(name: string, value: string | number | boolean, props: { [key: string]: any }) {
    props = props || {};
    let exp = props.expires;
    if (typeof exp == 'number' && exp) {
        const d = new Date();
        d.setTime(d.getTime() + exp * 1000);
        exp = props.expires = d;
    }
    if (exp && exp.toUTCString) {
        props.expires = exp.toUTCString();
    }
    value = encodeURIComponent(value);
    let updatedCookie = name + '=' + value;
    for (const propName in props) {
        updatedCookie += '; ' + propName;
        const propValue = props[propName];
        if (propValue !== true) {
            updatedCookie += '=' + propValue;
        }
    }
    document.cookie = updatedCookie;
}

export function deleteCookie(name: string) {
    setCookie(name, '', { expires: -1 });
}

export const getStatus = (status: TOrderStatus): { text: string, color: string } => {
    switch (status) {
        case 'created':
            return { text: 'Создан', color: 'white' }
        case 'done':
            return { text: 'Выполнен', color: '#00CCCC' }
        case 'pending':
            return { text: 'Готовится', color: 'white' }
        case 'cancelled':
            return { text: 'Отменён', color: '#E52B1A' }
        default:
            return { text: status, color: 'white' };
    }
}

export function checkResponse(res: Response) {
    if (res.ok) {
        return res;
    }
    return Promise.reject(res.status);
}

export function setTokens(res: { accessToken: string, refreshToken: string }) {
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

export function refreshTokens(): { accessToken: string, refreshToken: string } | null | undefined {
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

export async function fetchWithRefresh(url: string, options: RequestInit) {
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


