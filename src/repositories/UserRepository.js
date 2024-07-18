const knex = require("../database/knex");

class UserRepository {
  create = async ({ name, email, password }) => {
    const userId = await knex("users").insert({
      name,
      email,
      password,
    });

    return { id: userId };
  };

  update = async (user) => {
    await knex("users").update(user).where({ id: user.id });
  };

  findByEmail = async (email) => {
    const user = await knex("users").where({ email: email }).first();

    return user;
  };

  findById = async (id) => {
    const user = await knex("users").where({ id: id }).first();

    return user;
  };
}

module.exports = UserRepository;
