import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './order-feed-item.module.css';
import { ILocationState, TBurgerIngredient, TWSOrder } from '../../utils/types'
import { Link, useLocation } from 'react-router-dom';
import { FunctionComponent } from 'react';
import moment from 'moment';
import { getStatus } from '../../utils/utils';

const ingredientsSliceCount = 6;

export const OrderFeedItem: FunctionComponent<{ order: Omit<TWSOrder, 'ingredients'> & { ingredients: Array<TBurgerIngredient | undefined> }, showStatus?: boolean }> = ({ order, showStatus }) => {

    const location = useLocation<ILocationState>();

    return (order &&
        <Link
            key={order._id}
            to={{ pathname: `${location.pathname}/${order._id}`, state: { background: location } }}
            style={{ textDecoration: 'none', color: 'white' }}>
            <div className={styles.order_container}>
                <div className={styles.order_header}>
                    <span className={styles.order_header_number}>#{order.number}</span>
                    <span className={styles.order_header_date}>{moment(order.createdAt).calendar()}</span>
                </div>
                <div className="mt-6">
                    <span className="text text_type_main-medium">{order.name}</span>
                </div>
                {showStatus &&
                    <div className="mt-2">
                        <span className={styles.order_header_status} style={{ color: getStatus(order.status).color }}>{getStatus(order.status).text}</span>
                    </div>}
                <div className={styles.order_footer}>
                    <span className={styles.ingredients}>
                        {
                            order.ingredients.slice(0, ingredientsSliceCount).map((i, index) =>
                                <div key={index} className={styles.ingredient_border}>
                                    <div className={styles.ingredient_border_back} />
                                    <div className={styles.ingredient_image} style={{ opacity: order.ingredients.length > ingredientsSliceCount && (index === ingredientsSliceCount - 1) ? 0.6 : 1 }}>
                                        <img style={{ objectFit: 'cover', width: 64, height: 64 }} src={i?.image_mobile} />
                                    </div>
                                    {order.ingredients.length > ingredientsSliceCount && (index === ingredientsSliceCount - 1) &&
                                        <div className={styles.ingredient_image_dim_text}>+{order.ingredients.length - ingredientsSliceCount}</div>
                                    }
                                </div>)
                        }

                    </span>
                    <span className={styles.price}>
                        {order.ingredients.reduce((sm, a) => sm + (a?.price ?? 0), 0)}
                        <span className="mr-5 ml-3 mt-1"><CurrencyIcon type="primary" /></span>
                    </span>
                </div>
            </div>
        </Link >
    );
};

