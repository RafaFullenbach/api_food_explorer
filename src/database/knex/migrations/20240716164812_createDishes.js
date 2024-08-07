exports.up = (knex) =>
  knex.schema.createTable("dishes", (table) => {
    table.increments("id");
    table.text("name").notNullable();
    table.text("description");
    table.double("price");
    table.text("avatar").nullable();
    table.enu("category", ["Refeições", "Sobremesas", "Bebidas"]);
    table.timestamp("created_at").default(knex.fn.now());
    table.timestamp("updated_at").default(knex.fn.now());
  });

exports.down = (knex) => knex.schema.dropTable("dishes");
