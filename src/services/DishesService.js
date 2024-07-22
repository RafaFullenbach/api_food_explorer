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

  show = async() => {
    const dishes = await this.dishesRepository.showDishes();

    return dishes;
  }
}

module.exports = DishesService;
