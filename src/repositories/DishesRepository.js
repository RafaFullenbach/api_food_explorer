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

  createIngredients = async (ingredients) => {
    ingredients.map(async (ingredient) => {
      await knex("ingredients").insert(ingredient);
    });
  };

  showDish = async (id) => {
    const dishes = await knex("dishes").where({ id }).first();

    return dishes;
  };

  showIngredients = async (id) => {
    const ingredients = await knex("ingredients")
      .where({ dish_id: id })
      .orderBy("name");

    return ingredients;
  };

  deleteDish = async (id) => {
    await knex("dishes").where({id: id}).delete();
  };
}

module.exports = DishesRepository;
