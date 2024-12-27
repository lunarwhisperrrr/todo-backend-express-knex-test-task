const { Router } = require("express");
const { addComment, getComment, getAllComments } = require("../controllers/comment.controller");
const { authenticate } = require("../middleware/auth");
const router = Router();

router.get('/:comment_id', getComment);
router.get('/all/:todo_id', getAllComments);
router.post("/:todo_id", authenticate, addComment);
module.exports = router;
