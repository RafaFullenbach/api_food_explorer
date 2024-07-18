const AppError = require("../utils/AppError");
const { hash, compare } = require("bcryptjs");

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

  update = async ({ name, email, password, old_password, id }) => {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new AppError("Usuário não encontrado");
    }

    if (!email) {
      throw new AppError("Você precisa informar um e-mail.");
    }

    const userWithUpdateEmail = await this.userRepository.findByEmail(email);

    if (userWithUpdateEmail && userWithUpdateEmail.id !== user.id) {
      throw new AppError("Este e-mail já está em uso.");
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;

    if (password && !old_password) {
      throw new AppError(
        "Você precisa informar a senha antiga para definir a nova senha"
      );
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);

      if (!checkOldPassword) {
        throw new AppError("A senha antiga não confere.");
      }

      user.password = await hash(password, 8);
    }

    const userUpdated = await this.userRepository.update(user);

    return userUpdated;
  };
}

module.exports = UserService;
