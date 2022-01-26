import React, { useState, useEffect } from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { AvalaibleIngredientsContext } from '../../services/ingredients-context';
import { SelectedIngredientsContext } from '../../services/ingredients-context';
import { OrdersContext } from '../../services/orders-context';

const url = 'https://norma.nomoreparties.space/api/ingredients';

function App() {
    const [avalaibleIngredients, setAvalaibleIngredients] = useState([]);
    const selectedIngredientsState = useState([]);
    const ordersState = useState([]);

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
                <AvalaibleIngredientsContext.Provider value={avalaibleIngredients}>
                    <SelectedIngredientsContext.Provider value={selectedIngredientsState}>
                        <OrdersContext.Provider value={ordersState}>
                            <BurgerIngredients />
                            <BurgerConstructor />
                        </OrdersContext.Provider>
                    </SelectedIngredientsContext.Provider>
                </AvalaibleIngredientsContext.Provider>
                <div id="modals" />
            </main>
        </>
    );
}

export default App;
