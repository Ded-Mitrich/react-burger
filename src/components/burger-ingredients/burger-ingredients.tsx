import { useState, useRef, FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-ingredients.module.css';
import { IngredientElement } from '../ingredient-element/ingredient-element';
import { IRootState } from '../../services/reducers';

const topConstantContent = 284;

const BurgerIngredients: FunctionComponent = () => {
    const avalaibleIngredients = useSelector((store: IRootState) => store.ingredients.avalaible);
    const buns = useRef<HTMLDivElement>(null);
    const souces = useRef<HTMLDivElement>(null);
    const main = useRef<HTMLDivElement>(null);
    const [current, setCurrent] = useState('Булки');

    const onTabClick = (value: string) => {
        setCurrent(value);
        switch (value) {
            case 'Булки':
                buns.current?.scrollIntoView({ behavior: "smooth" });
                break;
            case 'Соусы':
                souces.current?.scrollIntoView({ behavior: "smooth" });
                break;
            case 'Начинки':
                main.current?.scrollIntoView({ behavior: "smooth" });
                break;
            default:
                break;
        }
    };

    const onScrollHandler = () => {
        if (!(buns.current && souces.current && main.current)) {
            return;
        }
        const bunsTop = Math.abs(buns.current.getBoundingClientRect().top - topConstantContent);
        const soucesTop = Math.abs(souces.current.getBoundingClientRect().top - topConstantContent);
        const mainTop = Math.abs(main.current.getBoundingClientRect().top - topConstantContent);
        const min = Math.min(bunsTop, soucesTop, mainTop);
        if (bunsTop === min) {
            setCurrent('Булки');
        }
        else if (mainTop === min) {
            setCurrent('Начинки');
        }
        else if (soucesTop === min) {
            setCurrent('Соусы');
        }
    }

    const ingredientGroup = (type: string) => {
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
                    <Tab value='Булки' active={current === 'Булки'} onClick={onTabClick}>
                        Булки
                    </Tab>
                    <Tab value='Соусы' active={current === 'Соусы'} onClick={onTabClick}>
                        Соусы
                    </Tab>
                    <Tab value='Начинки' active={current === 'Начинки'} onClick={onTabClick}>
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

