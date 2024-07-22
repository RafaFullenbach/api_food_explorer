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

  show = async (request, response) => {

    const dishes = await this.dishesService.show();

    return response.json(dishes);
  }
}

module.exports = DishesController;