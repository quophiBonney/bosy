const express = require("express");
const router = express.Router();

const {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
  shareTodo,
} = require("../controllers/todos.controller.js");

router.get("/:userId", getTodos);
router.post("/", addTodo);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);
router.post("/:id", shareTodo);

module.exports = router;
