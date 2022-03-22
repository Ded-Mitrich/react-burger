import type { AnyAction, Middleware, MiddlewareAPI } from 'redux';
import { AppDispatch, RootState } from '../services/store';
import { TWSActionTypes } from '../utils/types';

export const socketMiddleware = (wsActions: TWSActionTypes): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;
        const { dispatch, getState } = store;
        return next => (action: AnyAction) => {
            switch (action.type) {
                case wsActions.wsConnect.type:
                    {
                        if (action?.payload) {
                            socket = new WebSocket(action.payload);
                            socket.onopen = event => dispatch(wsActions.onOpen(event));
                            socket.onerror = event => dispatch(wsActions.onError(event));
                            socket.onmessage = event => dispatch(wsActions.onMessage(JSON.parse(event.data)));
                            socket.onclose = event => dispatch(wsActions.onClose(event));
                        }
                        break;
                    }
                case wsActions.wsDisconnect.type:
                    {
                        socket?.close();
                        break;
                    }
            }

            next(action);
        };
    }) as Middleware;
};