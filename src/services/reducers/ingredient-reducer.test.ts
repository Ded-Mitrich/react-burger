import { IIngredientState, IngredientActions, IngredientDragActions, TBurgerIngredient } from '../../utils/types';
import { ingredientsReducer as reducer } from './ingredient-reducer';

const burgerIngredient: TBurgerIngredient = {
    _id: 'id1',
    name: 'name 1',
    type: 'main',
    proteins: 1,
    fat: 2,
    carbohydrates: 3,
    calories: 4,
    price: 5,
    image: 'image',
    image_mobile: 'image_mobile',
    image_large: 'image_large',
    __v: 6,
};

const burgerSauce: TBurgerIngredient = {
    _id: 'id3',
    name: 'name 2',
    type: 'sauce',
    proteins: 3,
    fat: 4,
    carbohydrates: 5,
    calories: 6,
    price: 7,
    image: 'image 3',
    image_mobile: 'image_mobile 3',
    image_large: 'image_large 3',
    __v: 8,
};

const burgerBun: TBurgerIngredient = {
    _id: 'id2',
    name: 'name 2',
    type: 'bun',
    proteins: 2,
    fat: 3,
    carbohydrates: 4,
    calories: 5,
    price: 6,
    image: 'image 1',
    image_mobile: 'image_mobile 1',
    image_large: 'image_large 1',
    __v: 7,
};

describe('ingredients reducer', () => {
    it('should return avalaible ingredients', () => {
        expect(reducer(undefined, { type: IngredientActions.SET_AVALAIBLE_INGREDIENTS, items: [burgerIngredient, burgerSauce, burgerBun] }))
            .toEqual(
                {
                    avalaible: [burgerIngredient, burgerSauce, burgerBun],
                    selected: [],
                    buns: [],
                }
            )
    })

    it('should return added ingredient', () => {
        const state: IIngredientState = { avalaible: [burgerIngredient], buns: [], selected: [] };
        expect(reducer(state, { type: IngredientActions.ADD_INGREDIENT, uid: 'abc2', id: burgerIngredient._id }))
            .toEqual(
                {
                    avalaible: [burgerIngredient],
                    selected: [{ ...burgerIngredient, _uid: 'abc2' }],
                    buns: [],
                }
            )
    })

    it('should return added sauce', () => {
        const state: IIngredientState = { avalaible: [burgerSauce], buns: [], selected: [] };
        expect(reducer(state, { type: IngredientActions.ADD_INGREDIENT, uid: 'abc1', id: burgerSauce._id }))
            .toEqual(
                {
                    avalaible: [burgerSauce],
                    selected: [{ ...burgerSauce, _uid: 'abc1' }],
                    buns: [],
                }
            )
    })

    it('should return added bun', () => {
        const state: IIngredientState = { avalaible: [burgerBun], buns: [], selected: [] };
        expect(reducer(state, { type: IngredientActions.SET_BUNS, id: burgerBun._id }))
            .toEqual(
                {
                    avalaible: [burgerBun],
                    selected: [],
                    buns: [burgerBun, burgerBun],
                }
            )
    })

    it('should delete ingredient from selected', () => {
        const state: IIngredientState = { avalaible: [], buns: [], selected: [{ ...burgerIngredient, _uid: 'abc1' }] };
        expect(reducer(state, { type: IngredientActions.DELETE_INGREDIENT, id: 'abc1' }))
            .toEqual(
                {
                    avalaible: [],
                    selected: [],
                    buns: [],
                }
            )
    })

    it('should clear all selected ingredients', () => {
        const state: IIngredientState = { avalaible: [], buns: [burgerBun, burgerBun], selected: [burgerSauce, burgerIngredient] };
        expect(reducer(state, { type: IngredientActions.CLEAR_INGREDIENTS }))
            .toEqual(
                {
                    avalaible: [],
                    selected: [],
                    buns: [],
                }
            )
    })

    it('should replace dragged ingredient by hovered within selected colection', () => {
        const state: IIngredientState = { avalaible: [], buns: [], selected: [burgerSauce, burgerIngredient] };
        expect(reducer(state, { type: IngredientDragActions.REPLACE_INGREDIENT, dragIndex:1, hoverIndex:0}))
            .toEqual(
                {
                    avalaible: [],
                    selected: [burgerIngredient, burgerSauce],
                    buns: [],
                }
            )
    })

}) 