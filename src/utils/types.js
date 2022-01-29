import PropTypes from 'prop-types';

const burgerIngredientPropType = PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_mobile: PropTypes.string,
    image_large: PropTypes.string,
    __v: PropTypes.number,
});

export default burgerIngredientPropType;

export const FILAMENT_TYPE = 'FILAMENT';
export const BUN_TYPE = 'BUN';
export const REORDER_INGREDIENT_TYPE = 'REORDER_INGREDIENT_TYPE';