import { FunctionComponent } from 'react';
import { OrderFeedSummary } from '../components/order-feed-summary/order-feed-summary';
import { OrderFeed } from '../components/order-feed/order-feed';
import { clearWsData, ordersConnect, ordersDiconnect } from '../services/actions/action-creators';
import styles from './orders-feed-page.module.css';
import { useEffect } from 'react';
import { wsBaseUrl } from '../utils/utils';
import { useAppDispatch, useAppSelector } from '../services/store';

const OrdersFeedPage: FunctionComponent = () => {
    const { orders, total, totalToday } = useAppSelector(store => store.ws);
    const appDispatch = useAppDispatch();

    useEffect(() => {
        appDispatch(ordersConnect(`${wsBaseUrl}/all`));
        return () => {
            appDispatch(ordersDiconnect());
            appDispatch(clearWsData());
        };
    }, [])

    return (
        <div className={styles.main_container}>
            <div className={styles.order_header_container}>
                <h1 className={"mt-10 mb-5 text text_type_main-large " + styles.order_header}>Лента заказов</h1>
            </div>
            <div className={styles.root_container}>
                <div className={styles.order_feed}>
                    <OrderFeed orders={orders} />
                </div>
                <div className={styles.order_summary}>
                    <OrderFeedSummary orders={orders} total={total} totalToday={totalToday} />
                </div>
            </div>
        </div>
    );
}

export default OrdersFeedPage;
