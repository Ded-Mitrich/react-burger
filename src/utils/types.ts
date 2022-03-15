export type TBurgerIngredient = {
    _uid?: string,
    _id: string,
    name: string,
    type: 'bun' | 'main' | 'sauce',
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

export enum IngredientActions {
    SET_AVALAIBLE_INGREDIENTS = 'SET_AVALAIBLE_INGREDIENTS',
    SET_BUNS = 'SET_BUNS',
    ADD_INGREDIENT = 'ADD_INGREDIENT',
    DELETE_INGREDIENT = 'DELETE_INGREDIENT',
    CLEAR_INGREDIENTS = 'CLEAR_INGREDIENTS',
}

export enum IngredientDragActions {
    REPLACE_INGREDIENT = 'REPLACE_INGREDIENT',
}

export enum OrdersActions {
    MAKE_ORDER_SUCCESSFUL = 'MAKE_ORDER_SUCCESSFUL',
    MAKE_ORDER_FAILURE = 'MAKE_ORDER_FAILURE',
    CLOSE_ORDER_MODAL = 'CLOSE_ORDER_MODAL',
}

export interface IOrdersAction {
    type: OrdersActions;
    item?: TOrder;
    errorMessage?: string,
}

export interface IIngredientAction {
    type: IngredientActions;
    items?: TBurgerIngredient[];
    id?: string,
    uid?: string,
}

export interface IIngredientDragAction {
    type: IngredientDragActions;
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
    user?: TUser | null,
}

export interface IUserState {
    user: TUser | null,
    resetPassword: boolean,
    loading: boolean
}

export type TDragObject = {
    id: string,
    type: string,
    index: number
}

export interface Location<S = unknown> {
    pathname: string;
    search: string;
    state: S;
    hash: string;
    key?: string | undefined;
}

export interface ILocationState {
    background?: Location<ILocationState>
    from?: Location<ILocationState>
}

export enum ConstructorElementType {
    FILAMENT_TYPE = 'FILAMENT',
    BUN_TYPE = 'BUN',
    REORDER_INGREDIENT_TYPE = 'REORDER_INGREDIENT_TYPE',
}

