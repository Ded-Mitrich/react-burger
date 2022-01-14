import React from 'react';
import styles from './burger-constructor.module.css';
import { ConstructorElement, CurrencyIcon, DragIcon, Button, CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import burgerIngredientPropType from '../../utils/types';
import Modal from '../modal/modal';
import confirmImg from '../../images/Confirm.svg';


const BurgerConstructor = ({ elements }) => {
    const root = React.useRef(null);
    const [showModal, setshowModal] = React.useState(false);

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

    const modal = (
        <Modal modalRoot={root.current}>
            <div className={styles.modal_confirm}>
                <div className="mt-15 mr-10" style={{ display: 'flex', alignItems: 'center', justifyContent: 'right', width: '100%' }}>
                    <CloseIcon onClick={() => setshowModal(false)} />
                </div>
                <div className={"mt-10 mr-25 ml-25 text text_type_digits-large " + styles.order_number}>
                    034536
                </div>
                <div className="mt-8 text text_type_main-default">
                    идентификатор заказа
                </div>
                <img className="mt-15" src={confirmImg} />
                <div className="mt-15 text text_type_main-small">
                    Ваш заказ начали готовить
                </div>
                <div className="mt-2 mb-30 text text_type_main-small text_color_inactive">
                    Дождитесь готовности на орбитальной станции
                </div>
            </div>
        </Modal>
    );


    return (
        <section className={styles.main_holder}>
            <div ref={root}>
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
                    <Button type="primary" size="large" onClick={() => setshowModal(true)}>Оформить заказ</Button>
                </span>
                {showModal && modal}
            </div>
        </section>
    );
}

BurgerConstructor.propTypes = {
    elements: PropTypes.arrayOf(burgerIngredientPropType)
};

export default BurgerConstructor