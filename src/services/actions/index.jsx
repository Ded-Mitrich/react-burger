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
export const SET_BUNS = 'SET_BUNS';


export function deleteIngredient(uid) {
    return function (dispatch) {
        dispatch({
            type: DELETE_INGREDIENT,
            id: uid
        })
    };
}

export function addIngredient(id, uid) {
    return function (dispatch) {
        dispatch({
            type: ADD_INGREDIENT,
            id: id,
            uid: uid
        })
    };
}




