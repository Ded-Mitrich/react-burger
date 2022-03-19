import { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { OrderFeedSummary } from '../components/order-feed-summary/order-feed-summary';
import { OrderFeed } from '../components/order-feed/order-feed';
import { IRootState } from '../services/reducers';
import styles from './orders-feed-page.module.css';

const OrdersFeedPage: FunctionComponent = () => {
    const { allOrders, total, totalToday } = useSelector((store: IRootState) => store.ws);

    return (
        <div className={styles.main_container}>
            <div className={styles.order_header_container}>
                <h1 className={"mt-10 mb-5 text text_type_main-large " + styles.order_header}>Лента заказов</h1>
            </div>
            <div className={styles.root_container}>
                <div className={styles.order_feed}>
                    <OrderFeed orders={allOrders} />
                </div>
                <div className={styles.order_summary}>
                    <OrderFeedSummary orders={allOrders} total={total} totalToday={totalToday} />
                </div>
            </div>
        </div>
    );
}

export default OrdersFeedPage;
