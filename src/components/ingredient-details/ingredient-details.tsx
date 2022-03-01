import { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { IRootState } from '../../services/reducers';
import styles from './ingredient-details.module.css';

const IngredientDetails: FunctionComponent = () => {

    const avalaibleIngredients = useSelector((store: IRootState) => store.ingredients.avalaible);
    const { ingredientId } = useParams<{ ingredientId: string }>();
    const ingredient = avalaibleIngredients.find(e => e._id === ingredientId);

    return (ingredient ?
        <>
            <img src={ingredient.image_large} style={{ maxHeight: 240, objectFit: 'contain' }} />
            <h3 className="mt-4 text text_type_main-medium">
                {ingredient.name}
            </h3>
            <div className={"mt-8 mb-15 mr-25 ml-25 text text_type_main-default text_color_inactive " + styles.nutrition_data}>
                <span className={styles.nutrition_value}>
                    Калории, ккал
                    <span className="text_type_digits-default">{ingredient.calories}</span>
                </span>
                <span className={"ml-5 " + styles.nutrition_value}>
                    Белки, г
                    <span className="text_type_digits-default">{ingredient.proteins}</span>
                </span>
                <span className={"ml-5 " + styles.nutrition_value}>
                    Жиры, г
                    <span className="text_type_digits-default">{ingredient.fat}</span>
                </span>
                <span className={"ml-5 " + styles.nutrition_value}>
                    Углеводы, г
                    <span className="text_type_digits-default">{ingredient.carbohydrates}</span>
                </span>
            </div>
        </> : <></>
    )
}

export default IngredientDetails