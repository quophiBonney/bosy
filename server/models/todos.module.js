const mongoose = require("mongoose");

const TodosSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  time: {
    type: Date,
    default: Date.now,
  },
});

const TodoModel = mongoose.model("todos", TodosSchema);

module.exports = TodoModel;
