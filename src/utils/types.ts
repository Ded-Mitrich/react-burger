
export type TBurgerIngredient = {
    _uid: string,
    _id: string,
    name: string,
    type: string,
    proteins: number,
    fat: number,
    carbohydrates: number,
    calories: number,
    price: number,
    image: string,
    image_mobile: string,
    image_large: string,
    __v: number,
};

export type TOrder = {
    name: string,
    number: number
}

export interface IIngredientState {
    avalaible: TBurgerIngredient[],
    selected: TBurgerIngredient[],
    buns: TBurgerIngredient[],
}

export interface IOrdersState {
    items: TOrder[],
    errorMessage: string | null,
    currentItem: TOrder | null
}

export interface IIngredientAction {
    type: IngredientActions;
    items: TBurgerIngredient[];
    id: string,
    uid: string,
    dragIndex: number,
    hoverIndex: number
}

export enum IngredientActions {
    SET_AVALAIBLE_INGREDIENTS = 'SET_AVALAIBLE_INGREDIENTS',
    SET_BUNS = 'SET_BUNS',
    ADD_INGREDIENT = 'ADD_INGREDIENT',
    DELETE_INGREDIENT = 'DELETE_INGREDIENT',
    REPLACE_INGREDIENT = 'REPLACE_INGREDIENT',
    CLEAR_INGREDIENTS = 'CLEAR_INGREDIENTS',
}

export enum OrdersActions {
    MAKE_ORDER_SUCCESSFUL = 'MAKE_ORDER_SUCCESSFUL',
    MAKE_ORDER_FAILURE = 'MAKE_ORDER_FAILURE',
    CLOSE_ORDER_MODAL = 'CLOSE_ORDER_MODAL',
}

export interface IOrdersAction {
    type: OrdersActions;
    item: TOrder;
    errorMessage: string,
}

export interface IIngredientAction {
    type: IngredientActions;
    items: TBurgerIngredient[];
    id: string,
    uid: string,
    dragIndex: number,
    hoverIndex: number
}

export type TUser = {
    email: string,
    name: string
}

export enum UserActions {
    FORGOT_PASSWORD_FAILED = 'FORGOT_PASSWORD_FAILED',
    FORGOT_PASSWORD_SUCCESSFUL = 'FORGOT_PASSWORD_SUCCESSFUL',
    RESET_PASSWORD_SUCCESSFUL = 'RESET_PASSWORD_SUCCESSFUL',
    RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED',
    GET_USER_REQUEST = 'GET_USER_REQUEST',
    SET_USER = 'SET_USER',
    GET_USER_FAILED = 'GET_USER_FAILED',
}

export interface IUserAction {
    type: UserActions;
    user: TUser,
    loading: boolean,
}

export interface IUserState {
    user: TUser | null,
    resetPassword: boolean,
    loading: boolean
}

export const FILAMENT_TYPE = 'FILAMENT';
export const BUN_TYPE = 'BUN';
export const REORDER_INGREDIENT_TYPE = 'REORDER_INGREDIENT_TYPE';