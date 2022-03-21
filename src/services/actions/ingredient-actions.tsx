import { apiBaseUrl, checkResponse } from "../../utils/utils";
import { AppDispatch, AppThunk } from "../store";
import { setAvalaibleIngredients } from "./action-creators";

export const getAvalaibleIngredients: AppThunk = () => (dispatch: AppDispatch) => {
    fetch(apiBaseUrl + '/ingredients', { method: 'GET' })
        .then(checkResponse)
        .then(res => res.json())
        .then(res => {
            dispatch(setAvalaibleIngredients(res.data))
        }).catch(err => {
            console.log(err);
        })
}






