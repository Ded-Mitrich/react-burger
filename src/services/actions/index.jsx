import {
    avalaibleIngredientsRequest,
    clearIngredients,
    makeOrderFailure,
    sendOrderRequest,
    sendOrderSuccessful,
    setAvalaibleIngredients,
    setAvalaibleIngredientsFailed
} from "./action-creators";

const apiBaseUrl = 'https://norma.nomoreparties.space/api';


function checkResponse(res) {
    if (res.ok) {
        return res;
    }
    return Promise.reject(res.status);
}

export function getAvalaibleIngredients() {
    return function (dispatch) {
        dispatch(avalaibleIngredientsRequest());
        fetch(apiBaseUrl + '/ingredients', { method: 'GET' })
            .then(checkResponse)
            .then(res => res.json())
            .then(res => {
                dispatch(setAvalaibleIngredients(res.data))
            }).catch(err => {
                dispatch(setAvalaibleIngredientsFailed(err))
            })
    }
}

export function sendOrder(items) {
    return function (dispatch) {
        dispatch(sendOrderRequest());
        fetch(apiBaseUrl + '/orders', {
            method: 'POST',
            body: JSON.stringify({ ingredients: items.map((elem) => elem._id) }),
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(checkResponse)
            .then(res => res.json())
            .then(res => {
                if (res.success) {
                    dispatch(sendOrderSuccessful({ name: res.name, number: res.order.number }));
                    dispatch(clearIngredients());
                }
                else {
                    dispatch(makeOrderFailure(res.message));
                }
            }).catch(err => {
                dispatch(makeOrderFailure(err.message));
            })
    }
}






