import React from 'react';
import styles from './order-details.module.css';
import confirmImg from '../../images/Confirm.svg';

const OrderDetails = () => {
    return (
        <>
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
        </>
    )
}

export default OrderDetails