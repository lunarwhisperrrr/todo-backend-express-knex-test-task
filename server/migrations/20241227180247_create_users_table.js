exports.up = function (knex) {
  return knex.schema.createTable("users", function (table) {
    table.increments("id").primary();
    table.string("username", 50).notNullable().unique();
    table.string("email", 100).notNullable().unique();
    table.string("password_hash", 255).notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('users');
};
