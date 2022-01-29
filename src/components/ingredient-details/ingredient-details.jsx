import React from 'react';
import styles from './ingredient-details.module.css';
import { useSelector } from 'react-redux';

const IngredientDetails = () => {
    const ingredient = useSelector(store => store.ingredients.ingredientDetails);
    return (
        <>
            <img src={ingredient.image_large} style={{ maxHeight: 240, objectFit: 'contain' }} />
            <h3 className="mt-4 text text_type_main-medium">
                {ingredient.name}
            </h3>
            <div className={"mt-8 mb-15 mr-25 ml-25 text text_type_main-default text_color_inactive " + styles.nutrition_data}>
                <span className={styles.nutrition_value}>
                    Калории, ккал
                    <span className="text_type_digits-default">{ingredient.calories}</span>
                </span>
                <span className={"ml-5 " + styles.nutrition_value}>
                    Белки, г
                    <span className="text_type_digits-default">{ingredient.proteins}</span>
                </span>
                <span className={"ml-5 " + styles.nutrition_value}>
                    Жиры, г
                    <span className="text_type_digits-default">{ingredient.fat}</span>
                </span>
                <span className={"ml-5 " + styles.nutrition_value}>
                    Углеводы, г
                    <span className="text_type_digits-default">{ingredient.carbohydrates}</span>
                </span>
            </div>
        </>
    )
}

export default IngredientDetails