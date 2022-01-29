import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-element.module.css';
import burgerIngredientPropType, { BUN_TYPE, FILAMENT_TYPE } from '../../utils/types'
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { useDrag } from 'react-dnd';
import { SHOW_INGREDIENT_DETAILS, CLOSE_INGREDIENT_DETAILS, } from '../../services/actions';

const IngredientElement = ({ ingredient }) => {
    const selectedIngredients = useSelector(store => store.ingredients.selected);
    const { ingredientDetails } = useSelector(store => store.ingredients);
    const dispatch = useDispatch();

    const [, drag] = useDrag({
        type: ingredient.type === 'bun' ? BUN_TYPE : FILAMENT_TYPE,
        item: {
            id: ingredient._id,
            type: ingredient.type
        },
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    });

    const modal = (
        <Modal header='Детали ингредиента' onClose={() => closeDetails()}>
            <IngredientDetails ingredient={ingredient} />
        </Modal>
    );

    function showDetails(id) {
        dispatch({
            type: SHOW_INGREDIENT_DETAILS,
            id,
        })
    }

    function closeDetails() {
        dispatch({
            type: CLOSE_INGREDIENT_DETAILS,
        })
    }

    function handleClick(e) {
        e.preventDefault();
        showDetails(ingredient._id);
    }

    return (
        <div ref={drag} className={styles.ingredient_container}>
            <img className={styles.ingredient_image} src={ingredient.image} alt={ingredient.name} onClick={handleClick} />
            <Counter count={selectedIngredients.filter((elem) => elem._id === ingredient._id).length} size="default" />
            <span className={'mt-1 text text_type_digits-default ' + styles.price}>
                <span style={{ marginRight: 9 }} >{ingredient.price}</span>
                <CurrencyIcon type="primary" />
            </span>
            <span className={'mt-1 text text_type_main-default ' + styles.ingredient_text}>{ingredient.name}</span>
            {ingredientDetails && modal}
        </div>
    );
};

IngredientElement.propTypes = {
    ingredient: burgerIngredientPropType.isRequired
};

export default IngredientElement