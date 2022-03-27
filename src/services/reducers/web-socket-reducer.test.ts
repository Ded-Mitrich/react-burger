import { IWebSoketState, TWSOrder, WebSocketActions } from '../../utils/types';
import { wsReducer as reducer } from './web-socket-reducer';

const order: TWSOrder = {
    name: 'abc',
    number: 1,
    ingredients: [],
    _id: 'id1',
    status: 'pending',
    createdAt: new Date('2022-03-20T14:37:57.740Z'),
    updatedAt: new Date('2022-03-20T15:37:57.740Z'),
};

describe('ws reducer', () => {

    it('should return satate with ws message data', () => {
        expect(reducer(undefined, { type: WebSocketActions.WS_GET_MESSAGE, payload: { orders: [order], total: 1, totalToday: 1 } }))
            .toEqual(
                {
                    orders: [order],
                    total: 1,
                    totalToday: 1
                }
            )
    })

    it('should return initial state on clear data call', () => {
        const state: IWebSoketState = { orders: [order], total: 1, totalToday: 1 }
        expect(reducer(state, { type: WebSocketActions.WS_CLEAR_DATA }))
            .toEqual(
                {
                    orders: [],
                    total: 0,
                    totalToday: 0
                }
            )
    })

    it('should return actual state on open', () => {
        const state: IWebSoketState = { orders: [order], total: 1, totalToday: 1 }
        expect(reducer(state, { type: WebSocketActions.WS_CONNECTION_SUCCESS }))
            .toEqual(state)
    })

    it('should return actual state on error', () => {
        const state: IWebSoketState = { orders: [order], total: 1, totalToday: 1 }
        expect(reducer(state, { type: WebSocketActions.WS_CONNECTION_ERROR }))
            .toEqual(state)
    })

    it('should return actual state on close', () => {
        const state: IWebSoketState = { orders: [order], total: 1, totalToday: 1 }
        expect(reducer(state, { type: WebSocketActions.WS_CONNECTION_CLOSED }))
            .toEqual(state)
    })


}) 