export const SET_AVALAIBLE_INGREDIENTS = 'SET_AVALAIBLE_INGREDIENTS';
export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const MAKE_ORDER_SUCCESSFUL = 'MAKE_ORDER_SUCCESSFUL';
export const MAKE_ORDER_FAILURE = 'MAKE_ORDER_FAILURE';
export const CLEAR_INGREDIENTS = 'CLEAR_INGREDIENTS';
export const CLOSE_ORDER_MODAL = 'CLOSE_ORDER_MODAL';
export const SHOW_INGREDIENT_DETAILS = 'SHOW_INGREDIENT_DETAILS';
export const CLOSE_INGREDIENT_DETAILS = 'CLOSE_INGREDIENT_DETAILS';
export const REPLACE_INGREDIENT = 'REPLACE_INGREDIENT';
export const AVALAIBLE_INGREDIENTS_REQUEST = 'AVALAIBLE_INGREDIENTS_REQUEST';
export const AVALAIBLE_INGREDIENTS_FAILED = 'AVALAIBLE_INGREDIENTS_FAILED';
export const SET_BUNS = 'SET_BUNS';
export const SEND_ORDER_REQUEST = 'SEND_ORDER_REQUEST';
export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCESSFUL = 'FORGOT_PASSWORD_SUCCESSFUL';
export const FORGOT_PASSWORD_FAILED = 'FORGOT_PASSWORD_FAILED';
export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESSFUL = 'RESET_PASSWORD_SUCCESSFUL';
export const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED';
export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESSFUL = 'REGISTER_SUCCESSFUL';
export const REGISTER_FAILED = 'REGISTER_FAILED';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESSFUL = 'LOGIN_SUCCESSFUL';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESSFUL = 'LOGOUT_SUCCESSFUL';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';
export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESSFUL = 'GET_USER_SUCCESSFUL';
export const GET_USER_FAILED = 'GET_USER_FAILED';
export const SET_USER = 'SET_USER';
export const REFRESH_TOKEN_REQUEST = 'REFRESH_TOKEN_REQUEST';
export const REFRESH_TOKEN_FAILED = 'REFRESH_TOKEN_FAILED';
export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_FAILED = 'UPDATE_USER_FAILED';


export function forgotPasswordRequest() {
    return {
        type: FORGOT_PASSWORD_REQUEST,
    }
}

export function forgotPasswordFailed() {
    return {
        type: FORGOT_PASSWORD_FAILED,
    }
}

export function forgotPasswordSuccessful() {
    return {
        type: FORGOT_PASSWORD_SUCCESSFUL,
    }
}

export function resetPasswordRequest() {
    return {
        type: RESET_PASSWORD_REQUEST,
    }
}

export function resetPasswordFailed() {
    return {
        type: RESET_PASSWORD_FAILED,
    }
}

export function resetPasswordSuccessful() {
    return {
        type: RESET_PASSWORD_SUCCESSFUL,
    }
}

export function registerRequest() {
    return {
        type: REGISTER_REQUEST,
    }
}

export function registerSuccessful() {
    return {
        type: REGISTER_SUCCESSFUL,
    }
}

export function loginRequest() {
    return {
        type: LOGIN_REQUEST,
    }
}

export function loginFailed(error) {
    return {
        type: LOGIN_FAILED,
        error
    }
}

export function updateUserRequest() {
    return {
        type: UPDATE_USER_REQUEST,
    }
}

export function updateUserFailed(error) {
    return {
        type: UPDATE_USER_FAILED,
        error
    }
}

export function refreshTokenRequest() {
    return {
        type: REFRESH_TOKEN_REQUEST,
    }
}


export function refreshTokenFailed(error) {
    return {
        type: REFRESH_TOKEN_FAILED,
        error
    }
}

export function registerFailed(error) {
    return {
        type: REGISTER_FAILED,
        error
    }
}

export function logoutRequest() {
    return {
        type: LOGOUT_REQUEST,
    }
}

export function logoutFailed() {
    return {
        type: LOGOUT_FAILED,
    }
}

export function getUserReguest() {
    return {
        type: GET_USER_REQUEST,
    }
}

export function getUserFailed() {
    return {
        type: GET_USER_FAILED,
    }
}

export function getUserSuccessful() {
    return {
        type: GET_USER_SUCCESSFUL,
    }
}

export function setUser(user) {
    return {
        type: SET_USER,
        user
    }
}

export function closeOrderModal() {
    return {
        type: CLOSE_ORDER_MODAL,
    }
}

export function setBuns(id) {
    return {
        type: SET_BUNS,
        id
    }
}

export function deleteIngredient(uid) {
    return {
        type: DELETE_INGREDIENT,
        id: uid
    }
}

export function addIngredient(id, uid) {
    return {
        type: ADD_INGREDIENT,
        id: id,
        uid: uid
    }
}

export function replaceIngredient(dragIndex, hoverIndex) {
    return {
        type: REPLACE_INGREDIENT,
        dragIndex,
        hoverIndex
    }
}

export function showDetails(id) {
    return {
        type: SHOW_INGREDIENT_DETAILS,
        id,
    }
}

export function closeIngredientDetails() {
    return {
        type: CLOSE_INGREDIENT_DETAILS,
    }
}

export function avalaibleIngredientsRequest() {
    return {
        type: AVALAIBLE_INGREDIENTS_REQUEST,
    }
}

export function setAvalaibleIngredients(items) {
    return {
        type: SET_AVALAIBLE_INGREDIENTS,
        items
    }
}

export function setAvalaibleIngredientsFailed(error) {
    return {
        type: AVALAIBLE_INGREDIENTS_FAILED,
        error
    }
}

export function sendOrderRequest() {
    return {
        type: SEND_ORDER_REQUEST
    }
}

export function sendOrderSuccessful(item) {
    return {
        type: MAKE_ORDER_SUCCESSFUL,
        item
    }
}

export function clearIngredients() {
    return {
        type: CLEAR_INGREDIENTS
    }
}

export function makeOrderFailure(errorMessage) {
    return {
        type: MAKE_ORDER_FAILURE,
        errorMessage
    }
}






