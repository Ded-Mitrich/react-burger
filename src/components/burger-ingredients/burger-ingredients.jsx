import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-ingredients.module.css';
import IngredientElement from '../ingredient-element/ingredient-element';
import PropTypes from 'prop-types';
import burgerIngredientPropType from '../../utils/types'

const BurgerIngredients = ({ ingredients }) => {
    const buns = React.useRef(null);
    const souces = React.useRef(null);
    const main = React.useRef(null);
    const [current, setCurrent] = React.useState({ type: 'Булки', scrollTo: buns });

    const onTabClick = (value) => {
        setCurrent(value);
        console.log(current);
        value.scrollTo.current.scrollIntoView({ behavior: "smooth" });
    };

    const ingredientGroup = (type) => {
        const src = ingredients.filter(ingredient => ingredient.type === type);
        return (
            <div className={styles.ingredients_container}>
                {
                    src.map((elem) =>
                    (
                        <IngredientElement key={elem._id} ingredient={elem} />
                    ))
                }
            </div>
        )
    }

    return (
        <section className={styles.main_holder}>
            <h1 className="mt-10 mb-5 text text_type_main-large">Соберите бургер</h1>

            <div className={styles.tabs_container}>
                <Tab value={{ type: 'Булки', scrollTo: buns }} active={current.type === 'Булки'} onClick={onTabClick}>
                    Булки
                </Tab>
                <Tab value={{ type: 'Соусы', scrollTo: souces }} active={current.type === 'Соусы'} onClick={onTabClick}>
                    Соусы
                </Tab>
                <Tab value={{ type: 'Начинки', scrollTo: main }} active={current.type === 'Начинки'} onClick={onTabClick}>
                    Начинки
                </Tab>
            </div>
            <div className='custom-scroll' style={{ maxHeight: window.outerHeight - 322, overflow: 'auto' }}>
                <div ref={buns} className="mt-10 mb-6 text text_type_main-medium">
                    Булки
                    {ingredientGroup('bun')}
                </div>
                <div ref={souces} className="mt-10 mb-6 text text_type_main-medium">
                    Соусы
                    {ingredientGroup('sauce')}
                </div>
                <div ref={main} className="mt-10 mb-6 text text_type_main-medium">
                    Начинки
                    {ingredientGroup('main')}
                </div>
            </div>
        </section>
    );
}

BurgerIngredients.propTypes = {
    elements: PropTypes.arrayOf(burgerIngredientPropType)
};

export default BurgerIngredients

