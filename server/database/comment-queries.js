const knex = require("./connection");
exports.getAllCommentsForTodo = async (todo_id) => {
  const comments = await knex("comments")
    .where("todo_id", todo_id)
    .select("id", "content", "user_id", "created_at", "updated_at")
    .orderBy("created_at", "desc"); // Order by creation date

  return comments;
};

exports.getComment = async (comment_id) => {
  const comment = await knex("comments").where("id", comment_id);
  return comment[0];
};

exports.addComment = async (todo_id, user_id, content) => {
  const [commentId] = await knex("comments")
    .insert({
      todo_id,
      content,
      user_id,
      created_at: new Date(),
      updated_at: new Date(),
    })
    .returning("id"); // Return the new comment ID
  return commentId;
};

exports.updateComment = async (comment_id, user_id, content) => {
  const comment = await this.getComment(comment_id);
  if (!comment) throw new Error("No comment with that id");
  if (comment.user_id !== user_id)
    throw new Error("You are not authorized to update this comment.");
  const updatedRows = await knex("comments").where("id", id).update({
    content,
    updated_at: new Date(),
  });
  if (updatedRows) {
    return res.status(200).json({ message: "Comment updated" });
  } else {
    return res.status(404).json({ message: "Comment not found" });
  }
};

exports.deleteComment = async (comment_id, user_id) => {
  const comment = await this.getComment(comment_id);
  if (!comment) throw new Error("No comment with that id");
  if (comment.user_id !== user_id)
    throw new Error("You are not authorized to delete this comment.");
  const deletedRows = await knex("comments").where("id", comment_id).del();

  if (deletedRows) {
    return res.status(200).json({ message: "Comment deleted" });
  } else {
    return res.status(404).json({ message: "Comment not found" });
  }
};
