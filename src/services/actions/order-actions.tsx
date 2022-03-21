import { TBurgerIngredient } from "../../utils/types";
import { apiBaseUrl, authTokenCookieName, fetchWithRefresh, getCookie } from "../../utils/utils";
import { AppDispatch, AppThunk } from "../store";
import { makeOrderFailure, sendOrderSuccessful, makeOrderRequest, } from "./action-creators";

export const sendOrder: AppThunk = (items: TBurgerIngredient[]) => (dispatch: AppDispatch) => {
    dispatch(makeOrderRequest());
    const authToken = getCookie(authTokenCookieName);
    fetchWithRefresh(apiBaseUrl + '/orders', {
        method: 'POST',
        body: JSON.stringify({ ingredients: items.map((elem) => elem._id) }),
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + authToken
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
    })
        .then(res => {
            if (res.success) {
                dispatch(sendOrderSuccessful(res.order));
            }
            else {
                dispatch(makeOrderFailure(res.message ?? ''));
            }
        }).catch(err => {
            dispatch(makeOrderFailure(err.message));
        })
}







