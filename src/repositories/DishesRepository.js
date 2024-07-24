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
    const dish = await knex("dishes").where({ id }).first();

    return dish;
  };

  showIngredients = async (id) => {
    const ingredients = await knex("ingredients")
      .where({ dish_id: id })
      .orderBy("name");

    return ingredients;
  };

  deleteDish = async (id) => {
    await knex("dishes").where({ id: id }).delete();
  };

  showAllDishes = async (name) => {
    const dishes = await knex("dishes").select().whereLike("name", `%${name}%`);

    return dishes;
  };

  showFilteredIngredients = async ({ name, filterIngredients }) => {
    const dishes = await knex("ingredients")
      .select(["dishes.id", "dishes.name"])
      .whereLike("dishes.name", `%${name}%`)
      .whereIn("ingredients.name", filterIngredients)
      .innerJoin("dishes", "dishes.id", "ingredients.dish_id")
      .orderBy("dishes.name");

    return dishes;
  };

  showAllIngredients = async () => {
    const ingredients = await knex("ingredients");

    return ingredients;
  }

  updateDish = async (dish, addIngredients, removeIngredients) => {
    await knex("dishes").update(dish).where({ id: dish.id });

    this.createIngredients(addIngredients);

    this.deleteIngredient(removeIngredients);
  }

  deleteIngredient = async(ingredientsId) => {
    ingredientsId.map(async (id) => {
      await knex("ingredients").where({ id: id }).delete();
    });
  };
}

module.exports = DishesRepository;
