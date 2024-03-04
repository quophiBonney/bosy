const Todos = require("../models/todos.module");

const getTodos = async (req, res) => {
  try {
    const todos = await Todos.find({});
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addTodo = async (req, res) => {
  try {
    const newTodo = await Todos.create(req.body);
    res.status(200).json({ message: "Todo added successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const update = await Todos.findByIdAndUpdate(id, req.body);
    if (!update) {
      res.status(404).json({ message: "Todo not found" });
    } else {
      res.status(200).json({ message: "Todo updated successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const remove = await Todos.findByIdAndDelete(id);
    if (!remove) {
      res.status(404).json({ message: "Todo not found" });
    } else {
      res.status(200).json({ message: "Todo deleted successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const shareTodo = async (req, res) => {
  try {
    const todoToShare = req.body;
    const message = `On my todos, I will be ${JSON.stringify(todoShare)}`;
    const whatsappLink = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      message
    )}`;
    res.status(200).json({ whatsappLink });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getTodos, addTodo, updateTodo, deleteTodo, shareTodo };
