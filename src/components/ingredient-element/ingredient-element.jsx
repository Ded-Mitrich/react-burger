import React from 'react';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-element.module.css';

const IngredientElement = ({ text, img, price }) => {
    return (
        <div className={styles.ingredient_container}>
            <img className={styles.ingredient_image} src={img} alt={text} />
            <Counter count={1} size="default" />
            <span className={'mt-1 text text_type_digits-default ' + styles.price}>
                <span style={{ marginRight: 9 }} >{price}</span>
                <CurrencyIcon type="primary" />
            </span>
            <span className={'mt-1 text text_type_main-default ' + styles.ingredient_text}>{text}</span>
        </div>
    );
};

export default IngredientElement