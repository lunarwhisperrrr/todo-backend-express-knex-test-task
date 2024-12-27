const { Router } = require("express");
const controllers = require("../controllers/todo");
const { authenticate } = require("../middleware/auth");
const router = Router();
router.get("/", controllers.getAllTodos);
router.get("/:id", controllers.getTodo);

router.post("/", authenticate, controllers.postTodo);
router.patch("/:id", authenticate, controllers.patchTodo);

router.delete("/", authenticate, controllers.deleteAllTodos);
router.delete("/:id", authenticate, controllers.deleteTodo);

module.exports = router;
