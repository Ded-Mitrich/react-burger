import { combineReducers } from 'redux';
import {
    SET_AVALAIBLE_INGREDIENTS,
    ADD_INGREDIENT,
    DELETE_INGREDIENT,
    MAKE_ORDER_SUCCESSFUL,
    MAKE_ORDER_FAILURE,
    CLEAR_INGREDIENTS,
    CLOSE_ORDER_MODAL,
    SHOW_INGREDIENT_DETAILS,
    CLOSE_INGREDIENT_DETAILS,
    REPLACE_INGREDIENT,
    SET_BUNS,
    SET_USER,
    RESET_PASSWORD_SUCCESSFUL,
    RESET_PASSWORD_FAILED,
    FORGOT_PASSWORD_FAILED,
    FORGOT_PASSWORD_SUCCESSFUL
} from '../actions/action-creators';
import update from 'immutability-helper';

const ingredientsInitialState = {
    avalaible: [],
    selected: [],
    buns: [],
    ingredientDetails: false
};

const ordersInitialState = {
    items: [],
    errorMessage: null,
    currentItem: null
};

const authInitialState = {
    user: null,
    resetPassword : false
};

export const ingredientsReducer = (state = ingredientsInitialState, action) => {
    switch (action.type) {

        case SET_AVALAIBLE_INGREDIENTS: {
            return {
                ...state,
                avalaible: action.items
            };
        }

        case SET_BUNS: {
            const bun = state.avalaible.find((item) => item._id === action.id)
            return {
                ...state,
                buns: [bun, bun]
            };
        }

        case ADD_INGREDIENT: {
            return {
                ...state,
                selected: [...state.selected, { ...state.avalaible.find((item) => item._id === action.id), _uid: action.uid }]
            };
        }

        case DELETE_INGREDIENT: {
            return {
                ...state,
                selected: [...state.selected].filter(item => item._uid !== action.id)
            };
        }

        case REPLACE_INGREDIENT: {
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

        case CLEAR_INGREDIENTS: {
            return {
                ...state,
                selected: [],
                buns: []
            };
        }

        case SHOW_INGREDIENT_DETAILS: {
            return {
                ...state,
                ingredientDetails: true
            };
        }

        case CLOSE_INGREDIENT_DETAILS: {
            return {
                ...state,
                ingredientDetails: false
            };
        }

        default: {
            return state;
        }
    }
}

export const ordersReducer = (state = ordersInitialState, action) => {
    switch (action.type) {

        case MAKE_ORDER_SUCCESSFUL: {
            return {
                ...state,
                items: [...state.items, action.item],
                errorMessage: null,
                currentItem: action.item
            };
        }

        case MAKE_ORDER_FAILURE: {
            return {
                ...state,
                errorMessage: action.errorMessage,
                currentItem: null
            };
        }

        case CLOSE_ORDER_MODAL: {
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

export const authReducer = (state = authInitialState, action) => {
    switch (action.type) {

        case FORGOT_PASSWORD_FAILED: {
            return {
                ...state,
                resetPassword: false,
            };
        }

        case FORGOT_PASSWORD_SUCCESSFUL: {
            return {
                ...state,
                resetPassword: true,
            };
        }

        case RESET_PASSWORD_SUCCESSFUL: {
            return {
                ...state,
                resetPassword: false,
            };
        }

        case RESET_PASSWORD_FAILED: {
            return {
                ...state,
                resetPassword: false,
            };
        }

        case SET_USER: {
            return {
                ...state,
                user: action.user,
            };
        }

        default: {
            return state;
        }
    }
}

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    orders: ordersReducer,
    auth: authReducer
}) 