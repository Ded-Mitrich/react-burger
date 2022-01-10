import React from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

const data = require('./data.json');

function App() {
    return (
        <>
            <header>
                <AppHeader />
            </header>
            <main className={styles.main}>
                <section className={styles.main_ingredients}>
                    <BurgerIngredients ingredients={data} />
                </section>
                <section className={styles.main_constructor}>
                    <BurgerConstructor elements={data} />
                </section>
            </main>
        </>
    );
}

export default App;
