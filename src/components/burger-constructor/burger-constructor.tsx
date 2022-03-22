import { FunctionComponent, SyntheticEvent, useCallback } from 'react';
import styles from './burger-constructor.module.css';
import { CurrencyIcon, Button, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import {
    addIngredient,
    setBuns,
    replaceIngredient,
    closeOrderModal,
    clearIngredients,
} from '../../services/actions/action-creators';
import { ConstructorElementType, TBurgerIngredient, TDragObject } from '../../utils/types';
import { useDrop } from 'react-dnd';
import { v4 as uuidv4 } from 'uuid';
import { ConstructorElementLayout } from './constructor-element-layout';
import { useHistory } from 'react-router';
import { sendOrder } from '../../services/actions/order-actions';
import { useAppDispatch, useAppSelector } from '../../services/store';

const BurgerConstructor: FunctionComponent = () => {
    const appDispatch = useAppDispatch();
    const selectedIngredients = useAppSelector(store => store.ingredients.selected);
    const selectedBuns = useAppSelector(store => store.ingredients.buns);
    const { currentItem, requestSent } = useAppSelector(store => store.orders);
    const auth = useAppSelector(store => store.auth);
    const history = useHistory();

    const tryMakeOrder = (e: SyntheticEvent) => {
        e.preventDefault();
        if (!auth.user) {
            history.replace({ pathname: '/login' });
        }
        else {
            appDispatch(sendOrder(selectedBuns.concat(selectedIngredients)));
            appDispatch(clearIngredients());
        }
    }

    const [{ canDropFilament }, drop] = useDrop<TDragObject, void, { canDropFilament: boolean }>({
        accept: ConstructorElementType.FILAMENT_TYPE,
        collect: monitor => ({
            canDropFilament: monitor.canDrop(),
        }),
        drop(item) {
            appDispatch(addIngredient(item.id, uuidv4()));
        },
    });

    const [{ canDropBuns }, dropBuns] = useDrop({
        accept: ConstructorElementType.BUN_TYPE,
        collect: monitor => ({
            canDropBuns: monitor.canDrop(),
        }),
        drop(item: TDragObject) {
            appDispatch(setBuns(item.id));
        },
    });


    const moveLayout = useCallback((dragIndex, hoverIndex) => {
        appDispatch(replaceIngredient(dragIndex, hoverIndex))
    }, [selectedIngredients]);

    function elementLayout(elem: TBurgerIngredient, index: number) {
        return (elem && <div key={elem._uid} >
            <ConstructorElementLayout elem={elem} index={index} moveLayout={moveLayout} />
        </div>)
    }

    const bunLayout = (elem: TBurgerIngredient, type: 'top' | 'bottom') => {
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
        <Modal header='' onClose={() => appDispatch(closeOrderModal())}>
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
                    <span className="mr-2">{selectedBuns.concat(selectedIngredients).reduce((sm, a) => sm + a.price, 0)}</span>
                    <CurrencyIcon type="primary" />
                </div>
                <Button disabled={selectedBuns.length === 0 || requestSent} type="primary" size="large" onClick={tryMakeOrder}>Оформить заказ</Button>
            </span>
            {currentItem && modal}
        </section>
    );
}

export default BurgerConstructor