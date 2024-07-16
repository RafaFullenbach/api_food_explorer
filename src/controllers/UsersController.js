const UserRepository = require("../repositories/UserRepository");
const UserService = require("../services/UserService");

class UsersController {
    async create(request, response){
        const { name, email, password } = request.body;

        const userRepository = new UserRepository();
        const userCreateService = new UserService(userRepository);

        await userCreateService.create({name, email, password});

        return response.status(201).json();
    }
}

module.exports = UsersController;