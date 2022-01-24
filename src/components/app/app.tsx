import React, { useState, useEffect } from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { IngredientsContext } from '../../services/ingredients-context';

const url = 'https://norma.nomoreparties.space/api/ingredients';

function App() {
    const [avalaibleIngredients, setAvalaibleIngredients] = useState([])
    const [selectedIngredients, setSelectedIngredients] = useState([])

    useEffect(() => {
        fetch(url, { method: 'GET' })
            .then(res => { return res.json() })
            .then(res => setAvalaibleIngredients(res.data))
            .catch(e => console.log(e));
    })
    return (
        <>
            <AppHeader />
            <main className={styles.main}>
                <IngredientsContext.Provider value={
                    {
                        avalaibleIngredients,
                        setAvalaibleIngredients,
                        selectedIngredients,
                        setSelectedIngredients
                    }}>
                    <BurgerIngredients />
                    <BurgerConstructor />
                </IngredientsContext.Provider>
                <div id="modals" />
            </main>
        </>
    );
}

export default App;
