import styles from './order-feed.module.css';
import { TWSOrder } from '../../utils/types'
import { FunctionComponent } from 'react';
import { useAppSelector } from '../../services/store';
import { OrderFeedItem } from '../order-feed-item/order-feed-item';

export const OrderFeed: FunctionComponent<{ orders: TWSOrder[], showStatus?: boolean }> = ({ orders, showStatus }) => {
    const { avalaible } = useAppSelector(store => store.ingredients);
    const data = orders.map(o => ({ ...o, ingredients: o.ingredients.filter(x => x !== null).map(oi => avalaible.find(i => i._id === oi)).filter(x => x !== undefined) }));
    return (data && avalaible &&
        <section className={styles.main_holder}>
            <div className={styles.orders_container}>
                {data.map((order) => <div key={order._id}><OrderFeedItem order={order} showStatus={showStatus}/></div>)}
            </div>
        </section>
    );
};

