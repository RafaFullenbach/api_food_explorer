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

  index = async (request, response) => {
    const { name, ingredients } = request.query;

    const dishes = await this.dishesService.index({ name, ingredients });

    return response.json(dishes);
  };

  update = async (request, response) => {
    const { name, category, description, price, ingredients } = request.body;
    const { id } = request.params;

    await this.dishesService.update({ id, name, category, description, price, ingredients });

    return response.status(201).json();
  };
}

module.exports = DishesController;
