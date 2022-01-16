import React from 'react';
import { CurrencyIcon, Counter, CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-element.module.css';
import burgerIngredientPropType from '../../utils/types'
import Modal from '../modal/modal';

const IngredientElement = ({ ingredient, modalRoot }) => {
    const [showModal, setShowModal] = React.useState(false);

    const modal = (
        <Modal modalRoot={modalRoot.current}>
            <div className={styles.modal_details}>
                <div className={"text text_type_main-large " + styles.modal_header}>
                    Детали ингредиента
                    <span style={{ marginLeft: 225 }}><CloseIcon onClick={() => setShowModal(false)} /></span>
                </div>
                <img src={ingredient.image_large} style={{ maxHeight: 240, objectFit: 'contain' }} />

                <div className="mt-4 text text_type_main-medium">
                    {ingredient.name}
                </div>

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
            </div>
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