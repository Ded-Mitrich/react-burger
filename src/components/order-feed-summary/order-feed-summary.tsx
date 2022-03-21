import styles from './order-feed-summary.module.css';
import { TWSOrder } from '../../utils/types'
import { FunctionComponent } from 'react';

export const OrderFeedSummary: FunctionComponent<{ orders: TWSOrder[], total: number, totalToday: number }> = ({ orders, total, totalToday }) => {

    return (orders.length > 0 ?
        <section className={styles.main_holder}>
            <div className={styles.orders_container}>
                <div className={styles.orders_done_container}>
                    <div className="mb-6 text text_type_main-medium">Готовы:</div>
                    <div className={styles.orders_done_container_parent}>
                        {orders.filter(order => order.status === 'done').map((order) =>
                            <div style={{ color: '#00CCCC' }} className={styles.orders_done_container_div + ' text text_type_digits-default'} key={order.number}>{order.number}</div>)}
                    </div>
                </div>
                <div className={styles.orders_pending_container}>
                    <div className="mb-6 text text_type_main-medium">В работе:</div>
                    <div className={styles.orders_done_container_parent}>
                        {orders.filter(order => order.status === 'pending').map((order) =>
                            <div className={styles.orders_done_container_div + ' text text_type_digits-default'} key={order.number}>{order.number}</div>)}
                    </div>
                </div>
            </div>
            <div className="mt-15">
                <div className="text text_type_main-medium">Выполнено за все время:</div>
                <div className={"text text_type_digits-large " + styles.number_shadow}>{total}</div>
            </div>
            <div className="mt-15">
                <div className="text text_type_main-medium">Выполнено за сегодня:</div>
                <div className={"text text_type_digits-large " + styles.number_shadow}>{totalToday}</div>
            </div>
        </section>
        : null);
};

