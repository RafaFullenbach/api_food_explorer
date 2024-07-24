class DishesService {
  constructor(dishesRepository) {
    this.dishesRepository = dishesRepository;
  }

  create = async ({ name, category, ingredients, price, description }) => {
    const dish_id = await this.dishesRepository.createDish({
      name,
      description,
      price,
      category,
    });

    const ingredientsInsert = ingredients.map((name) => {
      return {
        name,
        dish_id,
      };
    });

    await this.dishesRepository.createIngredients(ingredientsInsert);
  };

  show = async (id) => {
    const dish = await this.dishesRepository.showDish(id);
    const ingredients = await this.dishesRepository.showIngredients(id);

    return { ...dish, ingredients };
  };

  delete = async (id) => {
    await this.dishesRepository.deleteDish(id);
  };

  index = async ({ name, ingredients }) => {
    let dishes;

    if (ingredients) {
      const filterIngredients = ingredients
        .split(",")
        .map((ingredient) => ingredient.trim());

      dishes = await this.dishesRepository.showFilteredIngredients({
        name,
        filterIngredients,
      });
    } else {
      dishes = await this.dishesRepository.showAllDishes(name);
    }

    const allIngredients = await this.dishesRepository.showAllIngredients();
    const dishesWithIngredients = dishes.map((dish) => {
      const dishesIngredients = allIngredients.filter(
        (ingredient) => ingredient.dish_id === dish.id
      );

      return {
        ...dish,
        ingredients: dishesIngredients,
      };
    });

    return dishesWithIngredients;
  };

  update = async ({ id, name, category, description, price, ingredients }) => {
    const dish = await this.dishesRepository.showDish(id);
    const bdIngredients = await this.dishesRepository.showIngredients(id);

    let toAdd = ingredients.filter(
      (ingredient) =>
        !bdIngredients.find((bdIngredient) => bdIngredient.name === ingredient)
    );

    toAdd = toAdd.map((name) => {
      return {
        name,
        dish_id: id,
      };
    });

    const toRemove = bdIngredients
      .filter((bdIngredient) => !ingredients.includes(bdIngredient.name))
      .map((bdIngredient) => bdIngredient.id);

    dish.name = name ?? dish.name;
    dish.category = category ?? dish.category;
    dish.description = description ?? dish.description;
    dish.price = price ?? dish.price;

    await this.dishesRepository.updateDish(dish, toAdd, toRemove);
  };
}

module.exports = DishesService;
