import React from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

const data = require('../../utils/data.json');
const selectedData = require('../../utils/selectedData.json');

function App() {
    return (
        <>
            <AppHeader />
            <main className={styles.main}>
                <BurgerIngredients ingredients={data} />
                <BurgerConstructor elements={selectedData} />
            </main>
        </>
    );
}

export default App;
