import React from 'react';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-element.module.css';
import burgerIngredientPropType from '../../utils/types'
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';

const IngredientElement = ({ ingredient }) => {
    const [showModal, setShowModal] = React.useState(false);

    const modal = (
        <Modal header='Детали ингредиента' onClose={() => setShowModal(false)}>
            <IngredientDetails ingredient={ingredient} />
        </Modal>
    );

    return (
        <div className={styles.ingredient_container}>
            <img className={styles.ingredient_image} src={ingredient.image} alt={ingredient.name} onClick={() => setShowModal(true)} />
            <Counter count={1} size="default" />
            <span className={'mt-1 text text_type_digits-default ' + styles.price}>
                <span style={{ marginRight: 9 }} >{ingredient.price}</span>
                <CurrencyIcon type="primary" />
            </span>
            <span className={'mt-1 text text_type_main-default ' + styles.ingredient_text}>{ingredient.name}</span>
            {showModal && modal}
        </div>
    );
};

IngredientElement.propTypes = {
    ingredient: burgerIngredientPropType.isRequired
};

export default IngredientElement