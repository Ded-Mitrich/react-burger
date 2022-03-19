import { combineReducers } from 'redux';
import update from 'immutability-helper';
import { IIngredientAction, IIngredientDragAction, IIngredientState, IngredientActions, IngredientDragActions, IOrdersAction, IOrdersState, IUserAction, IUserState, IWebSocketAction, IWebSoketState, OrdersActions, TBurgerIngredient, UserActions, WebSocketActions } from '../../utils/types';

const ingredientsInitialState: IIngredientState = {
    avalaible: [],
    selected: [],
    buns: [],
};

const ordersInitialState: IOrdersState = {
    items: [],
    errorMessage: null,
    currentItem: null,
    requestSent: false
};

const authInitialState: IUserState = {
    user: null,
    resetPassword: false,
    loading: false
};

const wsInitialState: IWebSoketState = {
    allOrders: [],
    userOrders: [],
    total: 0,
    totalToday: 0
};

export const ingredientsReducer = (state = ingredientsInitialState, action: IIngredientAction | IIngredientDragAction): IIngredientState => {
    switch (action.type) {

        case IngredientActions.SET_AVALAIBLE_INGREDIENTS: {
            return {
                ...state,
                avalaible: action.items ?? []
            };
        }

        case IngredientActions.SET_BUNS: {
            const bun = state.avalaible.find((item) => item._id === action.id)
            return {
                ...state,
                buns: bun ? [bun, bun] : state.buns
            };
        }

        case IngredientActions.ADD_INGREDIENT: {
            const ingredient = state.avalaible.find((item) => item._id === action.id);
            return {
                ...state,
                selected: ingredient ? [...state.selected, { ...ingredient, _uid: action.uid }] : state.selected
            };
        }

        case IngredientActions.DELETE_INGREDIENT: {
            return {
                ...state,
                selected: [...state.selected].filter(item => item._uid !== action.id)
            };
        }

        case IngredientDragActions.REPLACE_INGREDIENT: {
            if (action.dragIndex === undefined) {
                return state;
            }
            const ingredient = state.selected[action.dragIndex]
            return {
                ...state,
                selected: update([...state.selected], {
                    $splice: [
                        [action.dragIndex, 1],
                        [action.hoverIndex, 0, ingredient],
                    ],
                })
            };
        }

        case IngredientActions.CLEAR_INGREDIENTS: {
            return {
                ...state,
                selected: [],
                buns: []
            };
        }

        default: {
            return state;
        }
    }
}

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

export const authReducer = (state = authInitialState, action: IUserAction): IUserState => {
    switch (action.type) {

        case UserActions.FORGOT_PASSWORD_FAILED: {
            return {
                ...state,
                resetPassword: false,
            };
        }

        case UserActions.FORGOT_PASSWORD_SUCCESSFUL: {
            return {
                ...state,
                resetPassword: true,
            };
        }

        case UserActions.RESET_PASSWORD_SUCCESSFUL: {
            return {
                ...state,
                resetPassword: false,
            };
        }

        case UserActions.RESET_PASSWORD_FAILED: {
            return {
                ...state,
                resetPassword: false,
            };
        }

        case UserActions.GET_USER_REQUEST: {
            return {
                ...state,
                loading: true,
            };
        }

        case UserActions.GET_USER_FAILED: {
            return {
                ...state,
                loading: false,
            };
        }

        case UserActions.SET_USER: {
            return {
                ...state,
                user: action.user ?? null,
                loading: false,
            };
        }

        default: {
            return state;
        }
    }
}

export const wsReducer = (state = wsInitialState, action: IWebSocketAction): IWebSoketState => {
    switch (action.type) {
        case WebSocketActions.WS_GET_ALL_ORDERS_MESSAGE: {
            return {
                ...state,
                allOrders: action.data != null ? action.data.orders : state.allOrders,
                total: action.data != null ? action.data.total : state.total,
                totalToday: action.data != null ? action.data.totalToday : state.totalToday,
            };
        }
        case WebSocketActions.WS_GET_USER_ORDERS_MESSAGE: {
            return {
                ...state,
                userOrders: action.data != null ? action.data.orders : state.userOrders,
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

        default: {
            return state;
        }
    }
}

export interface IRootState {
    ingredients: IIngredientState,
    orders: IOrdersState,
    auth: IUserState,
    ws: IWebSoketState
}

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    orders: ordersReducer,
    auth: authReducer,
    ws: wsReducer
}) 