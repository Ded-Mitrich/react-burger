import { FunctionComponent, useRef } from 'react';
import styles from './burger-constructor.module.css';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { deleteIngredient } from '../../services/actions/action-creators';
import { ConstructorElementType, TBurgerIngredient, TDragObject } from '../../utils/types';
import { useDrop, useDrag } from 'react-dnd';
import { useAppDispatch } from '../../services/store';

export const ConstructorElementLayout: FunctionComponent<{
    elem: TBurgerIngredient, index: number, moveLayout: (dIndex: number, hIndex: number) => void
}> = ({ elem, index, moveLayout }) => {

    const appDispatch = useAppDispatch();
    const ref = useRef<HTMLSpanElement>(null);
    const [{ handlerId }, drop] = useDrop<TDragObject, void, { handlerId: null | string | symbol }>({
        accept: ConstructorElementType.REORDER_INGREDIENT_TYPE,
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            if (dragIndex === hoverIndex) {
                return;
            }
            const hoverBoundingRect = ref.current.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = (clientOffset?.y ?? 0) - hoverBoundingRect.top;
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            moveLayout(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },
    });

    const [{ isDragging }, drag] = useDrag({
        type: ConstructorElementType.REORDER_INGREDIENT_TYPE,
        item: () => {
            return { id: elem._uid, index };
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const opacity = isDragging ? 0 : 1;
    drag(drop(ref));

    return (elem && <span ref={ref} style={{ opacity }} data-handler-id={handlerId} className={styles.element_holder} >
        <span className="mr-2"><DragIcon type={'primary'} /></span>
        <ConstructorElement
            isLocked={false}
            text={elem.name}
            price={elem.price}
            thumbnail={elem.image}
            handleClose={() => {
                if (elem._uid) {
                    appDispatch(deleteIngredient(elem._uid))
                }
            }}
        />
    </span>)
}