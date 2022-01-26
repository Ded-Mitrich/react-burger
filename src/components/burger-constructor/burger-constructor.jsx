import React, { useContext } from 'react';
import styles from './burger-constructor.module.css';
import { ConstructorElement, CurrencyIcon, DragIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { SelectedIngredientsContext } from '../../services/ingredients-context';
import { OrdersContext } from '../../services/orders-context';

const makeOrderUrl = 'https://norma.nomoreparties.space/api/orders';

const BurgerConstructor = () => {
    const [selectedIngredients, setSelectedIngredients] = useContext(SelectedIngredientsContext);
    const [orders, setOrders] = useContext(OrdersContext);
    const [showModal, setShowModal] = React.useState(false);

    function deleteIngredient(uid) {
        setSelectedIngredients(selectedIngredients.filter((e) => e._uid !== uid));
    }

    function makeOrder(e) {
        fetch(makeOrderUrl, {
            method: 'POST',
            body: JSON.stringify({ ingredients: selectedIngredients.map((elem) => elem._id) }),
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(res => { return res.json() })
            .then(res => {
                if (res.success) {
                    setOrders([...orders, { name: res.name, number: res.order.number }]);
                    setShowModal(true);
                    setSelectedIngredients([]);
                }
            })
            .catch(e => console.log(e));
    }

    const elementLayout = (elem, type, isLocked) => {
        return (elem && <span key={elem._uid} className={styles.element_holder}>
            {!isLocked
                ? <span className="mr-2"><DragIcon /></span>
                : <span className="ml-8" />}
            <ConstructorElement
                type={type}
                isLocked={isLocked}
                text={elem.name + (type === 'top' ? ' (верх)' : type === 'bottom' ? ' (низ)' : '')}
                price={elem.price}
                thumbnail={elem.image}
                handleClose={() => deleteIngredient(elem._uid)}
            />
        </span>)
    }

    const modal = (
        <Modal header='' onClose={() => setShowModal(false)}>
            <OrderDetails />
        </Modal>
    );

    return (
        <section className={styles.main_holder}>
            <div className={styles.elements_container}>
                {elementLayout(selectedIngredients.filter((elem) => elem.type === 'bun')[0], 'top', true)}
                <div className={styles.scroll}>
                    {selectedIngredients
                        .filter((elem) => elem.type !== 'bun')
                        .map((elem) => (elementLayout(elem, '', false)
                        ))}
                </div>
                {elementLayout(selectedIngredients.filter((elem) => elem.type === 'bun')[1], 'bottom', true)}
            </div>
            <span className={styles.make_order}>
                <div className={'text text_type_digits-medium mr-10 mb-4 ' + styles.price}>
                    <span className="mr-2">{selectedIngredients.reduce((sm, a) => sm + a.price, 0)}</span>
                    <CurrencyIcon type="primary" />
                </div>
                <Button type="primary" size="large" onClick={makeOrder}>Оформить заказ</Button>
            </span>
            {showModal && modal}
        </section>
    );
}

export default BurgerConstructor