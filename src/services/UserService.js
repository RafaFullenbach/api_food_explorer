const AppError = require("../utils/AppError");
const { hash } = require("bcryptjs");

class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  create = async ({ name, email, password }) => {
    const checkUserExists = await this.userRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError("Este e-mail já está em uso.");
    }

    const hashedPassword = await hash(password, 8);

    const userCreated = await this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return userCreated;
  };

  update = async ({ name, email, id }) => {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new AppError("Usuário não encontrado");
    }

    const userWithUpdateEmail = await this.userRepository.findByEmail(email);

    if (userWithUpdateEmail && userWithUpdateEmail.id !== user.id) {
      throw new AppError("Este e-mail já está em uso.");
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;

    const userUpdated = await this.userRepository.update(user);

    return userUpdated;
  };
}

module.exports = UserService;
