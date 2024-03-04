const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const TodoModel = require("./models/todos.module.js");
const todoRoutes = require("./routes/todos.route.js");

dotenv.config();

const app = express();
app.use(express());

//middleware
app.use(cors());
app.use(express());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//routes
app.use("/api/todos", todoRoutes);
app.get("/", (req, res) => {
  res.send("Bosy API");
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Database connected"))
  .then((err) => console.log(err));

app.listen(process.env.PORT, () => {
  console.log(`Server started running on ${process.env.PORT}`);
});
