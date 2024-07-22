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

    const ingredientsInsert = ingredients.map(name => {
        return {
            name,
            dish_id
        }
    });

    await this.dishesRepository.createIngredients(ingredientsInsert);

  };

  show = async(id) => {
    const dish = await this.dishesRepository.showDish(id);
    const ingredients = await this.dishesRepository.showIngredients(id);

    return { ...dish, ingredients };
  }
}

module.exports = DishesService;
