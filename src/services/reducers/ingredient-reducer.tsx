import update from 'immutability-helper';
import { IIngredientAction, IIngredientDragAction, IIngredientState, IngredientActions, IngredientDragActions } from '../../utils/types';

const ingredientsInitialState: IIngredientState = {
    avalaible: [],
    selected: [],
    buns: [],
};

export const ingredientsReducer = (state = ingredientsInitialState, action: IIngredientAction | IIngredientDragAction): IIngredientState => {
    switch (action.type) {

        case IngredientActions.SET_AVALAIBLE_INGREDIENTS: {
            return {
                ...state,
                avalaible: action.items ?? []
            };
        }

        case IngredientActions.SET_BUNS: {
            const bun = state.avalaible.find((item) => item._id === action.id)
            return {
                ...state,
                buns: bun ? [bun, bun] : state.buns
            };
        }

        case IngredientActions.ADD_INGREDIENT: {
            const ingredient = state.avalaible.find((item) => item._id === action.id);
            return {
                ...state,
                selected: ingredient ? [...state.selected, { ...ingredient, _uid: action.uid }] : state.selected
            };
        }

        case IngredientActions.DELETE_INGREDIENT: {
            return {
                ...state,
                selected: [...state.selected].filter(item => item._uid !== action.id)
            };
        }

        case IngredientDragActions.REPLACE_INGREDIENT: {
            if (action.dragIndex === undefined) {
                return state;
            }
            const ingredient = state.selected[action.dragIndex]
            return {
                ...state,
                selected: update([...state.selected], {
                    $splice: [
                        [action.dragIndex, 1],
                        [action.hoverIndex, 0, ingredient],
                    ],
                })
            };
        }

        case IngredientActions.CLEAR_INGREDIENTS: {
            return {
                ...state,
                selected: [],
                buns: []
            };
        }

        default: {
            return state;
        }
    }
}