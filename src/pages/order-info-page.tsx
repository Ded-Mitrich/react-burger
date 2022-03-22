import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { OrderView } from '../components/order-view/order-view';
import { ordersDiconnect, ordersConnect } from '../services/actions/action-creators';
import { useAppDispatch } from '../services/store';
import { ILocationState } from '../utils/types';
import { authTokenCookieName, getCookie, wsBaseUrl } from '../utils/utils';
import styles from './ingredient-info-page.module.css';

function OrderInfoPage() {
    const appDispatch = useAppDispatch();
    const location = useLocation<ILocationState>();

    useEffect(() => {
        if (location.pathname.startsWith("/profile/orders/")) {
            const authToken = getCookie(authTokenCookieName);
            if (authToken) {
                appDispatch(ordersConnect(`${wsBaseUrl}?token=${authToken}`));
            }
        }
        else {
            appDispatch(ordersConnect(`${wsBaseUrl}/all`));
        }
        return () => {
            appDispatch(ordersDiconnect());
        };
    }, []);
    return (
        <div className={styles.root_container}>
            <OrderView />
        </div>
    )
}

export default OrderInfoPage