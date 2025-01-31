const _ = require("lodash");
const todos = require("../database/todo-queries.js");
const { addErrorReporting } = require("../utils/error");

function createToDo(req, data) {
  const protocol = req.protocol,
    host = req.get("host"),
    id = data.todo_id;

  return {
    id: data.todo_id,
    description: data.description,
    creator: {
      name: data.username,
      email: data.email,
    },
    title: data.title,
    order: data.order,
    completed: data.completed || false,
    url: `${protocol}://${host}/${id}`,
  };
}

async function getAllTodos(req, res) {
  const allEntries = await todos.all();
  console.log(allEntries);
  return res.send(allEntries.map(_.curry(createToDo)(req)));
}

async function getTodo(req, res) {
  const todo = await todos.get(req.params.id);
  return res.send(todo);
}

async function postTodo(req, res) {
  const created = await todos.create(
    req.body.title,
    req.body.order,
    req.body.description,
    req.user.id
  );
  return res.send(createToDo(req, created));
}

async function patchTodo(req, res) {
  const patched = await todos.update(req.params.id, req.body);
  return res.send(createToDo(req, patched));
}

async function deleteAllTodos(req, res) {
  const deletedEntries = await todos.clear();
  return res.send(deletedEntries.map(_.curry(createToDo)(req)));
}

async function deleteTodo(req, res) {
  // Check if user is the creator
  const { id } = req.params;
  const record = await todos.get(id);
  if (!record) throw new Error("No record with that id");
  if (record.user_id !== req.user.id)
    throw new Error("User cannot delete that todo");
  const deleted = await todos.delete(id);
  return res.send(createToDo(req, deleted));
}

const toExport = {
  getAllTodos: {
    method: getAllTodos,
    errorMessage: "Could not fetch all todos",
  },
  getTodo: { method: getTodo, errorMessage: "Could not fetch todo" },
  postTodo: { method: postTodo, errorMessage: "Could not post todo" },
  patchTodo: { method: patchTodo, errorMessage: "Could not patch todo" },
  deleteAllTodos: {
    method: deleteAllTodos,
    errorMessage: "Could not delete all todos",
  },
  deleteTodo: { method: deleteTodo, errorMessage: "Could not delete todo" },
};

for (let route in toExport) {
  toExport[route] = addErrorReporting(
    toExport[route].method,
    toExport[route].errorMessage
  );
}

module.exports = toExport;
