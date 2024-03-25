const Todos = require("../models/todos.model");
const axios = require("axios");

const getTodos = async (req, res) => {
  try {
    const userId = req.params.userId;
    // Validate userId (example)
    if (!isValidUserId(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    console.log("req.params:", req.params);
    const todos = await Todos.find({ userId });
    res.status(200).json(todos);
  } catch (error) {
    console.error("Error fetching todos:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const addTodo = async (req, res) => {
  try {
    const { userId, title, description } = req.body;
    const newTodo = new Todos({ userId, title, description });
    await newTodo.save();
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
    const response = await axios.get("https://api.whatsapp.com/send", {
      params: {
        text: req.body.message, // Pass the message from the request body to the WhatsApp API
      },
    });
    // Return the response from the WhatsApp API to the client
    res.json(response.data);
  } catch (error) {
    console.log("Error sharing to whatsapp:", error);
    res.status(500).json({ error: "Failed to send WhatsApp message" });
  }
};

module.exports = { getTodos, addTodo, updateTodo, deleteTodo, shareTodo };
