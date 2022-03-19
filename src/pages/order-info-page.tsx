import { OrderView } from '../components/order-view/order-view';
import styles from './ingredient-info-page.module.css';

function OrderInfoPage() {
    return (
        <div className={styles.root_container}>
            <OrderView />
        </div>
    )
}

export default OrderInfoPage