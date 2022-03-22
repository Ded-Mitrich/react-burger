import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredient-reducer';
import { ordersReducer } from './orders-reducer';
import { authReducer } from './user-reducer';
import { wsReducer } from './web-socket-reducer';

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    orders: ordersReducer,
    auth: authReducer,
    ws: wsReducer
}) 