import React from 'react';
import { useSelector } from 'react-redux';
import IngredientDetails from '../components/ingredient-details/ingredient-details';
import styles from './ingredient-info-page.module.css';

const IngredientInfoPage = () => {
    const avalaibleIngredients = useSelector(store => {
        return store.ingredients.avalaible
    });

    return (
        <div className={styles.root_container}>
            <h1 className="text text_type_main-medium">Детали ингредиента</h1>
            <IngredientDetails ingredient={avalaibleIngredients[Math.floor(Math.random() * avalaibleIngredients.length-1)]} />
        </div>
    )
}

export default IngredientInfoPage