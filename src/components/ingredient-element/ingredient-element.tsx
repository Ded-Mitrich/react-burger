import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-element.module.css';
import { ConstructorElementType, ILocationState, TBurgerIngredient, TDragObject } from '../../utils/types'
import { useDrag } from 'react-dnd';
import { Link, useLocation } from 'react-router-dom';
import { FunctionComponent } from 'react';
import { useAppSelector } from '../../services/store';

export const IngredientElement: FunctionComponent<{ ingredient: TBurgerIngredient }> = ({ ingredient }) => {
    const selectedIngredients = useAppSelector(store => store.ingredients.selected);
    const selectedBuns = useAppSelector(store => store.ingredients.buns);

    const [, drag] = useDrag<TDragObject, void, { isDrag: boolean }>({
        type: ingredient.type === 'bun' ? ConstructorElementType.BUN_TYPE : ConstructorElementType.FILAMENT_TYPE,
        item: {
            id: ingredient._id,
            type: ingredient.type,
            index: 0
        },
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    });

    const location = useLocation<ILocationState>();

    return (ingredient &&
        <Link
            key={ingredient._id}
            to={{ pathname: `/ingredients/${ingredient._id}`, state: { background: location } }}
            style={{ textDecoration: 'none', color: 'white' }}>

            <div ref={drag} className={styles.ingredient_container}>
                <img className={styles.ingredient_image} src={ingredient.image} alt={ingredient.name} />
                <Counter count={selectedBuns.concat(selectedIngredients).filter((elem) => elem._id === ingredient._id).length} size="default" />
                <span className={'mt-1 text text_type_digits-default ' + styles.price}>
                    <span style={{ marginRight: 9 }} >{ingredient.price}</span>
                    <CurrencyIcon type="primary" />
                </span>
                <span className={'mt-1 text text_type_main-default ' + styles.ingredient_text}>{ingredient.name}</span>
            </div>
        </Link>
    );
};

