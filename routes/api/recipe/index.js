const express = require('express');
const { validationResult } = require('express-validator');
const { addRecipeValidation, updateRecipeValidation, deleteRecipeValidation } = require('../../../validators/recipe');

const router = express.Router();
const recipe_controller = require('../../../controllers/api/recipe');

// Get all recipes
router.get('/', (req, res) => {
  recipe_controller.getAll(req, res);
});

// Create a new recipe
router.post('/', addRecipeValidation(), (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  recipe_controller.create(req, res);
});

// Update an existing recipe
router.put('/:id', updateRecipeValidation(), (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  recipe_controller.update(req, res);
});

// Delete a recipe
router.delete('/:id', deleteRecipeValidation(), (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  recipe_controller.delete(req, res);
});

module.exports = router;
