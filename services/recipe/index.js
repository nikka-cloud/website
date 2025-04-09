const fs = require('fs');

// Load the recipes array from the JSON database file
const recipes = require(global.mock_db);

const recipe_service = {
  getAll() {
    return recipes;
  },
  getById(id) {
    return recipes.find(r => r.id == id);
  },
  create(req, res) {
    let new_id = genRandId(4);
    const recipe = req.body;
    // Ensure ingredients is an array (if it's provided as a string)
    if (typeof recipe.ingredients === 'string') {
      recipe.ingredients = recipe.ingredients.split(',').map(i => i.trim());
    }
    const new_recipe = {
      id: new_id,
      recipe: recipe
    };
    recipes.push(new_recipe);
    writeToFile(recipes);
    return new_recipe;
  },
  update(id, updateData) {
    const recipeIndex = recipes.findIndex(r => r.id == id);
    if (recipeIndex === -1) {
      return null;
    }
    // Merge new data with the existing recipe
    recipes[recipeIndex].recipe = { ...recipes[recipeIndex].recipe, ...updateData };
    // Convert ingredients from comma-separated string to array if needed
    if (typeof recipes[recipeIndex].recipe.ingredients === 'string') {
      recipes[recipeIndex].recipe.ingredients = recipes[recipeIndex].recipe.ingredients.split(',').map(i => i.trim());
    }
    writeToFile(recipes);
    return recipes[recipeIndex];
  },
  delete(id) {
    const index = recipes.findIndex(r => r.id == id);
    if (index !== -1) {
      recipes.splice(index, 1);
      writeToFile(recipes);
    }
  }
};

let writeToFile = async (data) => {
  fs.writeFileSync(
    global.mock_db,
    JSON.stringify(data, null, 4),
    'utf8'
  );
};

let genRandId = (count) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < count; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

module.exports = recipe_service;
