import IngredientDetails from '../components/ingredient-details/ingredient-details';
import styles from './ingredient-info-page.module.css';

function IngredientInfoPage() {
    return (
        <div className={styles.root_container}>
            <h1 className="text text_type_main-medium">Детали ингредиента</h1>
            <IngredientDetails />
        </div>
    )
}

export default IngredientInfoPage