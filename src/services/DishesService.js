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
}

module.exports = DishesService;
