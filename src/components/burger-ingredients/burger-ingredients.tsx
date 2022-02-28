import { useState, useRef, FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-ingredients.module.css';
import { IngredientElement } from '../ingredient-element/ingredient-element';
import { IRootState } from '../../services/reducers';
import * as React from 'react';

const topConstantContent = 284;

const BurgerIngredients: FunctionComponent = () => {
    const avalaibleIngredients = useSelector((store: IRootState) => store.ingredients.avalaible);
    const buns = useRef(null);
    const souces = useRef(null);
    const main = useRef(null);
    const [current, setCurrent] = useState({ type: 'Булки', scrollTo: buns });

    const onTabClick = (value) => {
        setCurrent(value);
        value.scrollTo.current.scrollIntoView({ behavior: "smooth" });
    };

    const onScrollHandler = (e) => {
        const bunsTop = Math.abs(buns.current.getBoundingClientRect().top - topConstantContent);
        const soucesTop = Math.abs(souces.current.getBoundingClientRect().top - topConstantContent);
        const mainTop = Math.abs(main.current.getBoundingClientRect().top - topConstantContent);
        const min = Math.min(bunsTop, soucesTop, mainTop);
        if (bunsTop === min) {
            setCurrent({ type: 'Булки', scrollTo: buns });
        }
        else if (mainTop === min) {
            setCurrent({ type: 'Начинки', scrollTo: main });
        }
        else if (soucesTop === min) {
            setCurrent({ type: 'Соусы', scrollTo: souces });
        }
    }

    const ingredientGroup = (type) => {
        const src = avalaibleIngredients.filter(ingredient => ingredient.type === type);
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
            <div>
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
                <div className={styles.scroll} onScroll={onScrollHandler}>
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
            </div>
        </section >
    );
}

export default BurgerIngredients

