const { Router } = require("express");
const controllers = require("../controllers/todo");
const router = Router();
router.get("/", controllers.getAllTodos);
router.get("/:id", controllers.getTodo);

router.post("/", controllers.postTodo);
router.patch("/:id", controllers.patchTodo);

router.delete("/", controllers.deleteAllTodos);
router.delete("/:id", controllers.deleteTodo);

module.exports = router;
