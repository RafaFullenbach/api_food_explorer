const DishesRepository = require("../repositories/DishesRepository");
const DishesService = require("../services/DishesService");

class DishesController {
  constructor() {
    const dishesRepository = new DishesRepository();
    this.dishesService = new DishesService(dishesRepository);
  }

  create = async (request, response) => {
    const { name, category, ingredients, price, description } = request.body;

    await this.dishesService.create({
      name,
      category,
      ingredients,
      price,
      description,
    });

    return response.status(201).json();
  };
}

module.exports = DishesController;
