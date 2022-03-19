import { shallowEqual, useSelector } from 'react-redux';
import styles from './order-feed.module.css';
import { TWSOrder } from '../../utils/types'
import { FunctionComponent } from 'react';
import { IRootState } from '../../services/reducers';
import { OrderFeedItem } from '../order-feed-item/order-feed-item';

export const OrderFeed: FunctionComponent<{ orders: TWSOrder[], showStatus?: boolean }> = ({ orders, showStatus }) => {
    const { avalaible } = useSelector((store: IRootState) => store.ingredients);
    const data = orders.map(o => ({ ...o, ingredients: o.ingredients.map(oi => avalaible.find(i => i._id === oi)) }));
    return (data && avalaible &&
        <section className={styles.main_holder}>
            <div className={styles.orders_container}>
                {data.map((order) => <div key={order._id}><OrderFeedItem order={order} showStatus={showStatus}/></div>)}
            </div>
        </section>
    );
};

