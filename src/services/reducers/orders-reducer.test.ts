import { IOrdersState, OrdersActions, TOrder } from '../../utils/types';
import { ordersReducer as reducer } from './orders-reducer';

const order: TOrder = {
    name: 'abc',
    number: 1,
    ingredients: [],
    _id: 'id1',
    status: 'pending',
    createdAt: new Date('2022-03-20T14:37:57.740Z'),
    updatedAt: new Date('2022-03-20T15:37:57.740Z'),
};


describe('orders reducer', () => {
    it('should return added order', () => {
        expect(reducer(undefined, { type: OrdersActions.MAKE_ORDER_SUCCESSFUL, item: order }))
            .toEqual(
                {
                    items: [order],
                    errorMessage: null,
                    currentItem: order,
                    requestSent: false
                }
            )
    })

    it('should reset current item and request flag and set error message', () => {
        const state: IOrdersState = { items: [order], errorMessage: null, currentItem: order, requestSent: true };
        expect(reducer(state, { type: OrdersActions.MAKE_ORDER_FAILURE, errorMessage: 'abc' }))
            .toEqual(
                {
                    items: [order],
                    errorMessage: 'abc',
                    currentItem: null,
                    requestSent: false
                }
            )
    })

    it('should reset current item and error message on modal close', () => {
        const state: IOrdersState = { items: [order], errorMessage: 'abc', currentItem: order, requestSent: true };
        expect(reducer(state, { type: OrdersActions.CLOSE_ORDER_MODAL }))
            .toEqual(
                {
                    items: [order],
                    errorMessage: null,
                    currentItem: null,
                    requestSent: true
                }
            )
    })

    it('should set up the request flag on a fetch to api', () => {
        expect(reducer(undefined, { type: OrdersActions.MAKE_ORDER_REQUEST }))
            .toEqual(
                {
                    items: [],
                    errorMessage: null,
                    currentItem: null,
                    requestSent: true
                }
            )
    })

}) 