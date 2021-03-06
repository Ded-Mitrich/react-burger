import { IWebSocketAction, IWebSoketState, WebSocketActions } from '../../utils/types';

const wsInitialState: IWebSoketState = {
    orders: [],
    total: 0,
    totalToday: 0
};

export const wsReducer = (state = wsInitialState, action: IWebSocketAction): IWebSoketState => {
    switch (action.type) {
        case WebSocketActions.WS_GET_MESSAGE: {
            return {
                ...state,
                orders: action.payload != null ? action.payload.orders : state.orders,
                total: action.payload != null ? action.payload.total : state.total,
                totalToday: action.payload != null ? action.payload.totalToday : state.totalToday,
            };
        }
        case WebSocketActions.WS_CONNECTION_SUCCESS: {
            return state;
        }
        case WebSocketActions.WS_CONNECTION_CLOSED: {
            return state;
        }
        case WebSocketActions.WS_CONNECTION_ERROR: {
            console.log(action.event);
            return state;
        }
        case WebSocketActions.WS_CLEAR_DATA: {
            return wsInitialState;
        }

        default: {
            return state;
        }
    }
}