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






