import { combineReducers } from 'redux';
import update from 'immutability-helper';
import { IIngredientAction, IIngredientDragAction, IIngredientState, IngredientActions, IngredientDragActions, IOrdersAction, IOrdersState, IUserAction, IUserState, OrdersActions, TBurgerIngredient, UserActions } from '../../utils/types';

const ingredientsInitialState: IIngredientState = {
    avalaible: [],
    selected: [],
    buns: [],
};

const ordersInitialState: IOrdersState = {
    items: [],
    errorMessage : null,
    currentItem: null
};

const authInitialState : IUserState = {
    user: null,
    resetPassword : false,
    loading: false
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

export const ordersReducer = (state = ordersInitialState, action: IOrdersAction): IOrdersState  => {
    switch (action.type) {

        case OrdersActions.MAKE_ORDER_SUCCESSFUL: {
            return {
                ...state,
                items: action.item ? [...state.items, action.item] : state.items,
                errorMessage: null,
                currentItem: action.item ?? null
            };
        }

        case OrdersActions.MAKE_ORDER_FAILURE: {
            return {
                ...state,
                errorMessage: action.errorMessage ?? null,
                currentItem: null
            };
        }

        case OrdersActions.CLOSE_ORDER_MODAL: {
            return {
                ...state,
                errorMessage: null,
                currentItem: null
            };
        }

        default: {
            return state;
        }
    }
}

export const authReducer = (state = authInitialState, action : IUserAction) : IUserState => {
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

export interface IRootState {
    ingredients: IIngredientState,
    orders: IOrdersState,
    auth: IUserState
}

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    orders: ordersReducer,
    auth: authReducer
}) 