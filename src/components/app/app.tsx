import React, { useEffect } from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { useDispatch } from 'react-redux';
import { SET_AVALAIBLE_INGREDIENTS } from '../../services/actions';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const url = 'https://norma.nomoreparties.space/api/ingredients';

function App() {
    const dispatch = useDispatch();

    const setAvalaibleIngredients = (items: object[]) => {
        dispatch({
            type: SET_AVALAIBLE_INGREDIENTS,
            items
        })
    };

    useEffect(() => {
        fetch(url, { method: 'GET' })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(res.status);
            })
            .then(res => setAvalaibleIngredients(res.data))
            .catch(e => console.log(e));
    }, [])

    return (
        <>
            <AppHeader />
            <main className={styles.main}>
                <DndProvider backend={HTML5Backend}>
                    <BurgerIngredients />
                    <BurgerConstructor />
                </DndProvider>
                <div id="modals" />
            </main>
        </>
    );
}

export default App;
