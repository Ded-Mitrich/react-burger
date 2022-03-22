import { rootReducer } from './reducers';
import { compose, createStore, applyMiddleware, Action, ActionCreator } from 'redux';
import thunk from 'redux-thunk';
import { socketMiddleware } from '../middleware/socket-middleware';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { IOrdersAction, TWSActionTypes } from '../utils/types';
import { ordersConnect, ordersDiconnect, wsGetMessage, wsOnClose, wsOnError, wsOnOpen } from './actions/action-creators';

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export type ThunkAction<R, S, E, A extends Action> = (dispatch: ThunkDispatch<S, E, A>, getState: () => S, extraArgument: E) => R
export type AppThunk<TReturn = void> = ActionCreator<ThunkAction<TReturn, Action, RootState, IOrdersAction>>;
export const useAppDispatch = () => useDispatch<AppDispatch | AppThunk>();

const wsOrdersActions: TWSActionTypes = {
    wsConnect: ordersConnect,
    wsDisconnect: ordersDiconnect,
    onClose: wsOnClose,
    onOpen: wsOnOpen,
    onError: wsOnError,
    onMessage: wsGetMessage,
};

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(wsOrdersActions)));

export const store = createStore(rootReducer, enhancer);


