const knex = require("../database/knex");

class DishesRepository {
  createDish = async ({ name, description, price, category }) => {
    const [dish_id] = await knex("dishes").insert({
      name,
      description,
      price,
      category,
    });

    return dish_id;
  };

  createIngredients = async(ingredients) => {
    
    ingredients.map(async ingredient => {
        await knex("ingredients").insert(ingredient);
    });
  }
}

module.exports = DishesRepository;
