import { IOrdersAction, IOrdersState, OrdersActions } from '../../utils/types';

const ordersInitialState: IOrdersState = {
    items: [],
    errorMessage: null,
    currentItem: null,
    requestSent: false
};

export const ordersReducer = (state = ordersInitialState, action: IOrdersAction): IOrdersState => {
    switch (action.type) {

        case OrdersActions.MAKE_ORDER_SUCCESSFUL: {
            return {
                ...state,
                items: action.item ? [...state.items, action.item] : state.items,
                errorMessage: null,
                currentItem: action.item ?? null,
                requestSent: false
            };
        }

        case OrdersActions.MAKE_ORDER_FAILURE: {
            return {
                ...state,
                errorMessage: action.errorMessage ?? null,
                currentItem: null,
                requestSent: false
            };
        }

        case OrdersActions.CLOSE_ORDER_MODAL: {
            return {
                ...state,
                errorMessage: null,
                currentItem: null,
            };
        }
        case OrdersActions.MAKE_ORDER_REQUEST: {
            return {
                ...state,
                requestSent: true
            }
        }

        default: {
            return state;
        }
    }
}