import type { Middleware, MiddlewareAPI } from 'redux';
import { AppDispatch, RootState } from '../services/store';
import { IWebSocketAction, WebSocketActions } from '../utils/types';

export const socketMiddleware = (): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;

        return next => (action: IWebSocketAction) => {
            const { dispatch, getState } = store;
            const { type } = action;

            switch (type) {
                case WebSocketActions.WS_CONNECTION_START:
                    {
                        if (action?.payload?.url) {
                            socket = new WebSocket(action.payload.url);
                            socket.onopen = event => {
                                dispatch({ type: WebSocketActions.WS_CONNECTION_SUCCESS, event: event });
                            };
                            socket.onerror = event => {
                                dispatch({ type: WebSocketActions.WS_CONNECTION_ERROR, event: event });
                            };
                            socket.onmessage = event => {
                                dispatch({ type: WebSocketActions.WS_GET_MESSAGE, data: JSON.parse(event.data) });
                            };
                            socket.onclose = event => {
                                dispatch({ type: WebSocketActions.WS_CONNECTION_CLOSED, closeEvent: event });
                            };
                        }
                        break;
                    }
                case WebSocketActions.WS_CONNECTION_CLOSE:
                    {
                        socket?.close();
                        break;
                    }
            }

            next(action);
        };
    }) as Middleware;
};