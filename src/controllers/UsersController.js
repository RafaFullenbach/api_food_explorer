const UserRepository = require("../repositories/UserRepository");
const UserService = require("../services/UserService");

class UsersController {
  constructor() {
    const userRepository = new UserRepository();
    this.userService = new UserService(userRepository);
  }

  create = async (request, response) => {
    const { name, email, password } = request.body;

    await this.userService.create({ name, email, password });

    return response.status(201).json();
  };

  update = async (request, response) => {
    const { name, email, password, old_password } = request.body;
    const { id } = request.params;

    await this.userService.update({ name, email, password, old_password, id });

    return response.status(201).json();
  };
}

module.exports = UsersController;
