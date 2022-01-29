import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './burger-constructor.module.css';
import { CurrencyIcon, Button, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import {
    MAKE_ORDER_SUCCESSFUL,
    MAKE_ORDER_FAILURE,
    CLEAR_INGREDIENTS,
    CLOSE_ORDER_MODAL,
    REPLACE_INGREDIENT,
    SET_BUNS,
    addIngredient
} from '../../services/actions';
import { BUN_TYPE, FILAMENT_TYPE } from '../../utils/types';
import { useDrop } from 'react-dnd';
import { v4 as uuidv4 } from 'uuid';
import { ConstructorElementLayout } from './constructor-element-layout';

const makeOrderUrl = 'https://norma.nomoreparties.space/api/orders';

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
            setBuns(item.id);
        },
    });

    function clearConstructor() {
        dispatch({
            type: CLEAR_INGREDIENTS,
        })
    }

    function closeModal() {
        dispatch({
            type: CLOSE_ORDER_MODAL,
        })
    }

    function addOrder(item) {
        dispatch({
            type: MAKE_ORDER_SUCCESSFUL,
            item
        })
    }

    function setBuns(id) {
        dispatch({
            type: SET_BUNS,
            id
        })
    }

    function makeOrderFailure(errorMessage) {
        dispatch({
            type: MAKE_ORDER_FAILURE,
            errorMessage
        })
    }

    function makeOrder(e) {
        fetch(makeOrderUrl, {
            method: 'POST',
            body: JSON.stringify({ ingredients: selectedBuns.concat(selectedIngredients).map((elem) => elem._id) }),
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                makeOrderFailure(res.statusText);
                return Promise.reject(res.status);
            })
            .then(res => {
                if (res.success) {
                    addOrder({ name: res.name, number: res.order.number });
                    clearConstructor();
                }
                else {
                    makeOrderFailure(res.message);
                    Promise.reject(res.message)
                }
            })
            .catch(e => console.log(e));
    }

    const moveLayout = useCallback((dragIndex, hoverIndex) => {
        dispatch({
            type: REPLACE_INGREDIENT,
            dragIndex,
            hoverIndex
        })
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
        <Modal header='' onClose={() => closeModal()}>
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
                <Button type="primary" size="large" onClick={makeOrder}>Оформить заказ</Button>
            </span>
            {currentOrder && modal}
        </section>
    );
}

export default BurgerConstructor