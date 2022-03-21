import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './order-view.module.css';
import { ILocationState, TBurgerIngredient } from '../../utils/types'
import { useLocation, useParams } from 'react-router-dom';
import { FunctionComponent } from 'react';
import moment from 'moment';
import { getStatus } from '../../utils/utils';
import { useAppSelector } from '../../services/store';

export const OrderView: FunctionComponent = () => {

    const location = useLocation<ILocationState>();
    const { orders } = useAppSelector(store => store.ws);
    const ingredients = useAppSelector(store => store.ingredients.avalaible);
    const { id } = useParams<{ id: string }>();
    const order = orders.find(o => o._id === id);
    const orderIngredients = order?.ingredients.map(oi => ingredients.find(i => i._id === oi));
    const background = location.state && location.state.background;

    const groupBy = function (xs: (TBurgerIngredient | undefined)[]) {
        return xs.reduce<{ key: string, ingredients: TBurgerIngredient[] }[]>(
            (rv, x) => {
                if (x) {
                    const g = rv.find(k => k.key === x._id);
                    if (g) {
                        g.ingredients.push(x);
                    }
                    else {
                        rv.push({ key: x._id, ingredients: [x] })
                    }
                }
                return rv;
            }, []
        )
    }

    return (order && orderIngredients ?
        <div className={styles.order_container}>
            <h3 className={styles.order_header_number} style={{ justifyContent: background ? 'left' : 'center' }}>#{order.number}</h3>
            <div className="mt-10 text text_type_main-medium">{order.name}</div>
            <div className="mt-3 text text_type_main-default" style={{ color: getStatus(order.status).color }}>{getStatus(order.status).text}</div>
            <div className="mt-15 text text_type_main-medium">Состав:</div>
            <div className={styles.order_ingredients + " mt-6"}>
                {
                    groupBy(orderIngredients).map((i) =>
                        <div className={styles.ingredient_row} key={i.key}>
                            <div className={styles.ingredient_border}>
                                <img className={styles.ingredient_image} src={i.ingredients[0].image_mobile} />
                            </div>
                            <span className="ml-4 text text_type_main-default">{i.ingredients[0].name}</span>
                            <span className={styles.price}>
                                <span className="ml-4 text text_type_digits-default">
                                    {i.ingredients.length} x {i.ingredients[0].price}
                                    <span className="mr-5 ml-3 mt-1"><CurrencyIcon type="primary" /></span>
                                </span>
                            </span>
                        </div>
                    )
                }
            </div>
            <div className={styles.order_footer + " mt-10"}>
                <span className={styles.order_footer_date}>{moment(order.createdAt).calendar()}</span>
                <span className={styles.price}>
                    {orderIngredients?.reduce((sm, a) => sm + (a?.price ?? 0), 0)}
                    <span className="ml-3 mt-1"><CurrencyIcon type="primary" /></span>
                </span>
            </div>
        </div> : null
    );
};

