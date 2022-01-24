import React from 'react';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-element.module.css';
import burgerIngredientPropType from '../../utils/types'
import { IngredientsContext } from '../../services/ingredients-context';

const IngredientElement = ({ ingredient }) => {
    const [setSelectedIngredients] = useContext(IngredientsContext);

    return (
        <div className={styles.ingredient_container}>
            <img className={styles.ingredient_image} src={ingredient.image} alt={ingredient.name} />
            <Counter count={1} size="default" />
            <span className={'mt-1 text text_type_digits-default ' + styles.price}>
                <span style={{ marginRight: 9 }} >{ingredient.price}</span>
                <CurrencyIcon type="primary" />
            </span>
            <span className={'mt-1 text text_type_main-default ' + styles.ingredient_text}>{ingredient.name}</span>
        </div>
    );
};

IngredientElement.propTypes = {
    ingredient: burgerIngredientPropType.isRequired
};

export default IngredientElement