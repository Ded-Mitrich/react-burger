import { IngredientActions, OrdersActions, UserActions } from "../../utils/types"

export function forgotPasswordFailed() {
    return {
        type: UserActions.FORGOT_PASSWORD_FAILED,
    }
}

export function forgotPasswordSuccessful() {
    return {
        type: UserActions.FORGOT_PASSWORD_SUCCESSFUL,
    }
}

export function resetPasswordFailed() {
    return {
        type: UserActions.RESET_PASSWORD_FAILED,
    }
}

export function resetPasswordSuccessful() {
    return {
        type: UserActions.RESET_PASSWORD_SUCCESSFUL,
    }
}

export function getUserReguest() {
    return {
        type: UserActions.GET_USER_REQUEST,
    }
}

export function getUserFailed(error) {
    return {
        type: UserActions.GET_USER_FAILED,
        error
    }
}

export function setUser(user) {
    return {
        type: UserActions.SET_USER,
        user
    }
}

export function sendOrderSuccessful(item) {
    return {
        type: OrdersActions.MAKE_ORDER_SUCCESSFUL,
        item
    }
}

export function makeOrderFailure(errorMessage) {
    return {
        type: OrdersActions.MAKE_ORDER_FAILURE,
        errorMessage
    }
}

export function closeOrderModal() {
    return {
        type: OrdersActions.CLOSE_ORDER_MODAL,
    }
}

export function setBuns(id) {
    return {
        type: IngredientActions.SET_BUNS,
        id
    }
}

export function deleteIngredient(uid) {
    return {
        type: IngredientActions.DELETE_INGREDIENT,
        id: uid
    }
}

export function addIngredient(id, uid) {
    return {
        type: IngredientActions.ADD_INGREDIENT,
        id: id,
        uid: uid
    }
}

export function replaceIngredient(dragIndex, hoverIndex) {
    return {
        type: IngredientActions.REPLACE_INGREDIENT,
        dragIndex,
        hoverIndex
    }
}

export function setAvalaibleIngredients(items) {
    return {
        type: IngredientActions.SET_AVALAIBLE_INGREDIENTS,
        items
    }
}

export function clearIngredients() {
    return {
        type: IngredientActions.CLEAR_INGREDIENTS
    }
}








