import React from 'react';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-constructor.module.css';
import { CurrencyIcon, DragIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import burgerIngredientPropType from '../../utils/types'


const BurgerConstructor = ({ elements }) => {

    const elementLayout = (elem, type, isLocked) => {
        return (<span key={elem._id} className={styles.element_holder}>
            {!isLocked
                ? <span className="mr-2"><DragIcon /></span>
                : <span className="ml-8" />}
            <ConstructorElement
                type={type}
                isLocked={isLocked}
                text={elem.name + (type === 'top' ? ' (верх)' : type === 'bottom' ? ' (низ)' : '')}
                price={elem.price}
                thumbnail={elem.image}
            />
        </span>)
    }

    return (
        <div className={styles.main_holder}>
            <div className={styles.elements_container}>

                {elementLayout(elements[0], 'top', true)}
                <div className='custom-scroll' style={{ maxHeight: window.outerHeight - 564, overflow: 'auto' }}>
                    {elements.filter((elem, index) => index !== 0 && index !== elements.length - 1).map((elem, index) => (
                        elementLayout(elem, '', false)
                    ))}
                </div>
                {elementLayout(elements[elements.length - 1], 'bottom', true)}
            </div>
            <span className={styles.make_order}>
                <span className={'text text_type_digits-medium mr-10 ' + styles.price}>
                    <span style={{ marginRight: 9 }}>{elements.reduce((sm, a) => sm + a.price, 0)}</span>
                    <CurrencyIcon type="primary" />
                </span>
                <Button type="primary" size="large">Оформить заказ</Button>
            </span>
        </div>
    );
}

BurgerConstructor.propTypes = {
    elements: PropTypes.arrayOf(burgerIngredientPropType)
};

export default BurgerConstructor