import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './burger-constructor.module.css';
import { CurrencyIcon, Button, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import {
    addIngredient,
    setBuns,
    replaceIngredient,
    closeOrderModal,
} from '../../services/actions/action-creators';
import { BUN_TYPE, FILAMENT_TYPE } from '../../utils/types';
import { useDrop } from 'react-dnd';
import { v4 as uuidv4 } from 'uuid';
import { ConstructorElementLayout } from './constructor-element-layout';
import { sendOrder } from '../../services/actions';


const BurgerConstructor = () => {
    const dispatch = useDispatch();
    const selectedIngredients = useSelector(store => store.ingredients.selected);
    const selectedBuns = useSelector(store => store.ingredients.buns);
    const currentOrder = useSelector(store => store.orders.currentItem);

    const [{ canDropFilament }, drop] = useDrop({
        accept: FILAMENT_TYPE,
        collect: monitor => ({
            canDropFilament: monitor.canDrop(),
        }),
        drop(item) {
            dispatch(addIngredient(item.id, uuidv4()));
        },
    });

    const [{ canDropBuns }, dropBuns] = useDrop({
        accept: BUN_TYPE,
        collect: monitor => ({
            canDropBuns: monitor.canDrop(),
        }),
        drop(item) {
            dispatch(setBuns(item.id));
        },
    });


    const moveLayout = useCallback((dragIndex, hoverIndex) => {
        dispatch(replaceIngredient(dragIndex, hoverIndex))
    }, [selectedIngredients]);

    function elementLayout(elem, index) {
        return (elem && <div key={elem._uid} >
            <ConstructorElementLayout elem={elem} index={index} moveLayout={moveLayout} />
        </div>)
    }

    const bunLayout = (elem, type) => {
        return (elem && <span className={styles.element_holder} >
            <span className="ml-8" />
            <ConstructorElement
                type={type}
                isLocked={true}
                text={elem.name + (type === 'top' ? ' (верх)' : type === 'bottom' ? ' (низ)' : '')}
                price={elem.price}
                thumbnail={elem.image}
            />
        </span>)
    };

    const modal = (
        <Modal header='' onClose={() => dispatch(closeOrderModal())}>
            <OrderDetails />
        </Modal>
    );

    return (
        <section className={styles.main_holder}>
            <div ref={dropBuns} className={canDropBuns ? styles.highlight_border_buns : styles.elements_container}>
                {bunLayout(selectedBuns[0], 'top')}
                <div ref={drop} className={canDropFilament ? styles.highlight_border_filament : styles.scroll}>
                    {selectedIngredients
                        .filter((elem) => elem.type !== 'bun')
                        .map((elem, index) => (elementLayout(elem, index)
                        ))}
                </div>
                {bunLayout(selectedBuns[1], 'bottom')}
            </div>
            <span className={styles.make_order}>
                <div className={'text text_type_digits-medium mr-10 mb-4 ' + styles.price}>
                    <span className="mr-2">{selectedIngredients.reduce((sm, a) => sm + a.price, 0)}</span>
                    <CurrencyIcon type="primary" />
                </div>
                <Button disabled={selectedBuns.length === 0} type="primary" size="large" onClick={() => dispatch(sendOrder(selectedBuns.concat(selectedIngredients)))}>Оформить заказ</Button>
            </span>
            {currentOrder && modal}
        </section>
    );
}

export default BurgerConstructor