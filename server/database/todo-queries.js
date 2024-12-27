const knex = require("./connection.js");

async function all() {
  return knex("todos").leftJoin("users", "users.id", "todos.user_id").select(
    "todos.id as todo_id", // Qualify the id for todos
    "todos.title", // Specify the other columns
    "todos.description",
    "todos.order",
    "todos.created_at",
    "todos.updated_at",
    "todos.completed",
    "users.id as user_id", // Qualify the id for users
    "users.username", // Get additional user information
    "users.email" // Assuming you want the email as well
  );
}

async function get(id) {
  const results = await knex("todos")
    .where("todos.id", id)
    .leftJoin("users", "users.id", "todos.user_id")
    .select(
      "todos.id as todo_id", // Qualify the id for todos
      "todos.title", // Specify the other columns
      "todos.description",
      "todos.order",
      "todos.created_at",
      "todos.updated_at",
      "todos.completed",
      "users.id as user_id", // Qualify the id for users
      "users.username", // Get additional user information
      "users.email" // Assuming you want the email as well
    );
  return results[0];
}

async function create(title, order, description, userId) {
  const results = await knex("todos")
    .insert({ title, order, description, user_id: userId })
    .returning("*");
  return results[0];
}

async function update(id, properties) {
  const results = await knex("todos")
    .where({ id })
    .update({ ...properties })
    .returning("*");
  return results[0];
}

// delete is a reserved keyword
async function del(id) {
  const results = await knex("todos").where({ id }).del().returning("*");
  return results[0];
}

async function clear() {
  return knex("todos").del().returning("*");
}

module.exports = {
  all,
  get,
  create,
  update,
  delete: del,
  clear,
};
