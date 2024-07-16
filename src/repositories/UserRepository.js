const knex = require("../database/knex");

class UserRepository {
    async create({name, email, password}){

        const userId = await knex("users").insert({
            name,
            email,
            password
        })

        return {id: userId};
    }

    async findByEmail(email) {
        const user = await knex("users").where({ email: email }).first();

        return user;
        
    }
}

module.exports = UserRepository;