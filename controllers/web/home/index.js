const recipe_service = require('../../../services/recipe');

const home_controller = {
  index: async (req, res) => {
    res.render('home/main', { title: "Home" });
  },
  add: async (req, res) => {
    res.render('home/add_update', { mode: 'Add', title: "Add Recipe" });
  },
  update: async (req, res) => {
    const recipeData = await recipe_service.getById(req.params.id);
    res.render('home/add_update', { mode: 'Update', recipeData, title: "Update Recipe" });
  },
  list: async (req, res) => {
    res.render('home/index', { title: "Recipe List" });
  }
};

module.exports = home_controller;
