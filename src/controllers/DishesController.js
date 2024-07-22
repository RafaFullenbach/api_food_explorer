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
    const { id } = request.params;

    const dish = await this.dishesService.show(id);

    return response.json(dish);
  };

  delete = async (request, response) => {
    const { id } = request.params;

    await this.dishesService.delete(id);

    return response.json();
  };
}

module.exports = DishesController;
