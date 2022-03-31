import { ActionCreatorWithoutPayload, ActionCreatorWithPayload } from "@reduxjs/toolkit";

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
    number: number,
    ingredients: TBurgerIngredient[],
    _id: string,
    status: TOrderStatus,
    createdAt: Date,
    updatedAt: Date,
}

export type TOrderStatus = 'pending' | 'created' | 'done' | 'cancelled';

export interface IIngredientState {
    avalaible: TBurgerIngredient[],
    selected: TBurgerIngredient[],
    buns: TBurgerIngredient[],
}

export interface IOrdersState {
    items: TOrder[],
    errorMessage: string | null,
    currentItem: TOrder | null,
    requestSent: boolean
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
    MAKE_ORDER_REQUEST = 'MAKE_ORDER_REQUEST'
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
    type?: IngredientDragActions;
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
    user?: TUser | null;
}

export enum WebSocketActions {
    WS_CONNECT = 'WS_CONNECT',
    WS_CONNECTION_SUCCESS = 'WS_CONNECTION_SUCCESS',
    WS_CONNECTION_ERROR = 'WS_CONNECTION_ERROR',
    WS_GET_MESSAGE = 'WS_GET_MESSAGE',
    WS_CONNECTION_CLOSED = 'WS_CONNECTION_CLOSED',
    WS_DISCONNECT = 'WS_DISCONNECT',
    WS_CLEAR_DATA = 'WS_CLEAR_DATA'
}

export type TWSOrder = Omit<TOrder, 'ingredients'> & { ingredients: string[] }

export type IWebSocketAction = {
    type: WebSocketActions;
    payload?: {
        orders: TWSOrder[],
        total: number,
        totalToday: number
    };
    event?: Event;
    closeEvent?: CloseEvent;
}

export interface IWebSoketState {
    orders: TWSOrder[],
    total: number,
    totalToday: number
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

export type TWSActionTypes = {
    wsConnect: ActionCreatorWithPayload<string>;
    wsDisconnect: ActionCreatorWithoutPayload;
    wsSendMessage?: ActionCreatorWithPayload<any>;
    onOpen: ActionCreatorWithPayload<Event>;
    onClose: ActionCreatorWithPayload<CloseEvent>;
    onError: ActionCreatorWithPayload<Event>;
    onMessage: ActionCreatorWithPayload<any>;
};

