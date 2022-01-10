import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-ingredients.module.css';
import IngredientElement from '../ingredient-element/ingredient-element';
import PropTypes from 'prop-types';

const BurgerIngredients = ({ ingredients }) => {
    const [current, setCurrent] = React.useState('Булки');

    const ingredientGroup = (type, header) => {
        const src = ingredients.filter(ingredient => ingredient.type === type);
        return (<>
            <div className="mt-10 mb-6 text text_type_main-medium">
                {header}
            </div>
            <div className={styles.ingredients_container}>
                {
                    src.map((elem) => (
                        <IngredientElement
                            key={elem._id}
                            text={elem.name}
                            price={elem.price}
                            img={elem.image}
                        />
                    ))
                }
            </div>
        </>)
    }

    return (
        <div>
            <h1 className="mt-10 mb-5 text text_type_main-large">Соберите бургер</h1>

            <div className={styles.tabs_container}>
                <Tab value="Булки" active={current === 'Булки'} onClick={setCurrent}>
                    Булки
                </Tab>
                <Tab value="Соусы" active={current === 'Соусы'} onClick={setCurrent}>
                    Соусы
                </Tab>
                <Tab value="Начинки" active={current === 'Начинки'} onClick={setCurrent}>
                    Начинки
                </Tab>
            </div>
            <div className='custom-scroll' style={{ maxHeight: window.outerHeight - 322, overflow: 'auto' }}>
                {ingredientGroup('bun', 'Булки')}
                {ingredientGroup('sauce', 'Соусы')}
                {ingredientGroup('main', 'Начинки')}
            </div>
        </div>
    );
}

BurgerIngredients.propTypes = {
    ingredients : PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        proteins: PropTypes.number,
        fat: PropTypes.number,
        carbohydrates: PropTypes.number,
        calories: PropTypes.number,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        image_mobile: PropTypes.string,
        image_large: PropTypes.string,
        __v: PropTypes.number,
    }))
};

export default BurgerIngredients

