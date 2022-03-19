import type { Middleware, MiddlewareAPI } from 'redux';
import { AppDispatch, RootState } from '../services/store';
import { IUserAction, IWebSocketAction, WebSocketActions } from '../utils/types';
import { authTokenCookieName, getCookie } from '../utils/utils';
const wsBaseUrl = 'wss://norma.nomoreparties.space/orders';

export const socketMiddleware = (): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socketAll: WebSocket | null = null;
        let socketUser: WebSocket | null = null;

        return next => (action: IWebSocketAction | IUserAction) => {
            const { dispatch, getState } = store;
            const { type } = action;

            if (type === WebSocketActions.WS_ALL_CONNECTION_START) {
                socketAll = new WebSocket(wsBaseUrl + '/all');
                socketAll.onopen = event => {
                    dispatch({ type: WebSocketActions.WS_CONNECTION_SUCCESS, event: event });
                };
                socketAll.onerror = event => {
                    dispatch({ type: WebSocketActions.WS_CONNECTION_ERROR, event: event });
                };
                socketAll.onmessage = event => {
                    dispatch({ type: WebSocketActions.WS_GET_ALL_ORDERS_MESSAGE, data: JSON.parse(event.data) });
                };
                socketAll.onclose = event => {
                    dispatch({ type: WebSocketActions.WS_CONNECTION_CLOSED, closeEvent: event });
                };
            }
            else if (type === WebSocketActions.WS_USER_CONNECTION_START) {
                const authToken = getCookie(authTokenCookieName);
                if (authToken) {
                    socketUser = new WebSocket(wsBaseUrl + `?token=${authToken}`);
                    socketUser.onopen = event => {
                        dispatch({ type: WebSocketActions.WS_CONNECTION_SUCCESS, event: event });
                    };
                    socketUser.onerror = event => {
                        dispatch({ type: WebSocketActions.WS_CONNECTION_ERROR, event: event });
                    };
                    socketUser.onmessage = event => {
                        dispatch({ type: WebSocketActions.WS_GET_USER_ORDERS_MESSAGE, data: JSON.parse(event.data) });
                    };
                    socketUser.onclose = event => {
                        dispatch({ type: WebSocketActions.WS_CONNECTION_CLOSED, closeEvent: event });
                    };
                }
            }

            next(action);
        };
    }) as Middleware;
};