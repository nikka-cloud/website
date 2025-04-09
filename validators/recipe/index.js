// validators/recipe/index.js
const { body, param } = require('express-validator');
const recipe_service = require('../../services/recipe');

const addRecipeValidation = () => {
  return [
    body('recipeName')
      .trim()
      .notEmpty().withMessage('Recipe name must not be empty')
      .isLength({ min: 3, max: 255 }).withMessage('Recipe name must be between 3 and 255 characters long'),
    body('prepTime')
      .trim()
      .notEmpty().withMessage('Preparation time must not be empty')
      .toInt() // Convert the input to an integer
      .isInt({ min: 0 }).withMessage('Preparation time must be a valid non-negative integer (in minutes)'),
    body('cookTime')
      .trim()
      .notEmpty().withMessage('Cooking time must not be empty')
      .toInt()
      .isInt({ min: 0 }).withMessage('Cooking time must be a valid non-negative integer (in minutes)'),
    body('ingredients')
      .trim()
      .notEmpty().withMessage('Ingredients must not be empty'),
    body('instructions')
      .trim()
      .notEmpty().withMessage('Instructions must not be empty')
  ];
};

const updateRecipeValidation = () => {
  return [
    param('id')
      .custom(async (id) => {
        const exists = await recipe_service.getById(id);
        if (!exists) {
          throw new Error('Recipe not found');
        }
      }),
    body('recipeName')
      .trim()
      .notEmpty().withMessage('Recipe name must not be empty')
      .isLength({ min: 3, max: 255 }).withMessage('Recipe name must be between 3 and 255 characters long'),
    body('prepTime')
      .trim()
      .notEmpty().withMessage('Preparation time must not be empty')
      .toInt()
      .isInt({ min: 0 }).withMessage('Preparation time must be a valid non-negative integer (in minutes)'),
    body('cookTime')
      .trim()
      .notEmpty().withMessage('Cooking time must not be empty')
      .toInt()
      .isInt({ min: 0 }).withMessage('Cooking time must be a valid non-negative integer (in minutes)'),
    body('ingredients')
      .trim()
      .notEmpty().withMessage('Ingredients must not be empty'),
    body('instructions')
      .trim()
      .notEmpty().withMessage('Instructions must not be empty')
  ];
};

const deleteRecipeValidation = () => {
  return [
    param('id').custom(async (id) => {
      const exists = await recipe_service.getById(id);
      if (!exists) {
        throw new Error('Recipe not found');
      }
    })
  ];
};

module.exports = {
  addRecipeValidation,
  updateRecipeValidation,
  deleteRecipeValidation
};
