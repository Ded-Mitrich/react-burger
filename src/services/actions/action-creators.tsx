import { IngredientActions, IngredientDragActions, OrdersActions, TBurgerIngredient, TOrder, TUser, UserActions, WebSocketActions } from "../../utils/types"

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

export function getUserFailed(error: string) {
    return {
        type: UserActions.GET_USER_FAILED,
        error
    }
}

export function setUser(user: TUser | null) {
    return {
        type: UserActions.SET_USER,
        user
    }
}

export function sendOrderSuccessful(item: TOrder) {
    return {
        type: OrdersActions.MAKE_ORDER_SUCCESSFUL,
        item
    }
}

export function makeOrderFailure(errorMessage: string) {
    return {
        type: OrdersActions.MAKE_ORDER_FAILURE,
        errorMessage
    }
}

export function makeOrderRequest() {
    return {
        type: OrdersActions.MAKE_ORDER_REQUEST,
    }
}

export function closeOrderModal() {
    return {
        type: OrdersActions.CLOSE_ORDER_MODAL,
    }
}

export function setBuns(id: string) {
    return {
        type: IngredientActions.SET_BUNS,
        id
    }
}

export function deleteIngredient(uid: string) {
    return {
        type: IngredientActions.DELETE_INGREDIENT,
        id: uid
    }
}

export function addIngredient(id: string, uid: string) {
    return {
        type: IngredientActions.ADD_INGREDIENT,
        id: id,
        uid: uid
    }
}

export function replaceIngredient(dragIndex: number, hoverIndex: number) {
    return {
        type: IngredientDragActions.REPLACE_INGREDIENT,
        dragIndex,
        hoverIndex
    }
}

export function setAvalaibleIngredients(items: TBurgerIngredient[]) {
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

export function openWsOrders(url: string, token?: string) {
    return {
        type: WebSocketActions.WS_CONNECTION_START,
        payload: { url, token }
    }
}

export function closeWsOrders() {
    return {
        type: WebSocketActions.WS_CONNECTION_CLOSE,
    }
}

export function clearWsData() {
    return {
        type: WebSocketActions.WS_CLEAR_DATA,
    }
}









