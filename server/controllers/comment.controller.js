const { addComment, getComment, getAllCommentsForTodo } = require("../database/comment-queries");
const { addErrorReporting } = require("../utils/error");

exports.addComment = addErrorReporting(async (req, res) => {
  const { content } = req.body;
  const { todo_id } = req.params;
  const user_id = req.user.id;
  const commentId = await addComment(todo_id, user_id, content);
  return res.status(201).json({
    message: "Comment created",
    commentId,
  });
}, "Internal Server Error");

exports.getComment = addErrorReporting(async (req, res) => {
  const { comment_id } = req.params;
  const data = await getComment(comment_id);
  return res.status(200).json({
    data,
  });
}, "Interal Server Error");

exports.getAllComments = addErrorReporting(async (req, res) => {
  const { todo_id } = req.params;
  const data = await getAllCommentsForTodo(todo_id);
  return res.status(200).json({
    data,
  });
}, "Interal Server Error");
