const express = require('express');
const recipe_router = require('./recipe');

const router = express.Router();

// Register the recipe router under /api/recipe
router.use('/recipe', recipe_router);

module.exports = router;
