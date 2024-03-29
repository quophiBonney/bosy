if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: __dirname + "/.env" });
}
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const TodoModel = require("./models/todos.model.js");
const todoRoutes = require("./routes/todos.route.js");

dotenv.config();

const app = express();

const port = process.env.PORT || 5000;
//middleware
app.use(express());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({ origin: "*" }));

//routes
app.use("/api/todos", todoRoutes);

app.get("/", (req, res) => {
  res.send("Bosy backend API");
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Database connected"))
  .then((err) => console.log(err));

app.listen(port, () => {
  console.log(`Server started running on ${port}`);
});
