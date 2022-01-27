import React, { useContext } from 'react';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-element.module.css';
import burgerIngredientPropType from '../../utils/types'
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { SelectedIngredientsContext } from '../../services/ingredients-context';

const IngredientElement = ({ ingredient }) => {
    const [showModal, setShowModal] = React.useState(false);
    const [selectedIngredients, setSelectedIngredients] = useContext(SelectedIngredientsContext);

    const modal = (
        <Modal header='Детали ингредиента' onClose={() => setShowModal(false)}>
            <IngredientDetails ingredient={ingredient} />
        </Modal>
    );

    const uid = function () {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    function handleClick(e) {
        if (ingredient.type === 'bun') {
            if (selectedIngredients.filter((elem) => elem.type === 'bun').length === 0) {
                setSelectedIngredients([...selectedIngredients,
                { ...ingredient, _uid: uid() },
                { ...ingredient, _uid: uid() }]);
            }
            else {
                setSelectedIngredients([...selectedIngredients.filter((elem) => elem.type !== 'bun'),
                { ...ingredient, _uid: uid() },
                { ...ingredient, _uid: uid() }]);
            }
        }
        else {
            setSelectedIngredients([...selectedIngredients, { ...ingredient, _uid: uid(), }]);
        }
    }

    function handleContextMenu(e) {
        e.preventDefault();
        setShowModal(true);
    }

    return (
        <div className={styles.ingredient_container}>
            <img className={styles.ingredient_image} src={ingredient.image} alt={ingredient.name} onClick={handleClick} onContextMenu={handleContextMenu} />
            <Counter count={selectedIngredients.filter((elem) => elem._id === ingredient._id).length} size="default" />
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