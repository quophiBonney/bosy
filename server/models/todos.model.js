const mongoose = require("mongoose");

const TodosSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  time: {
    type: Date,
    default: Date.now,
  },
});

const TodoModel = mongoose.model("todos", TodosSchema);

module.exports = TodoModel;
