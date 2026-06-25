const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { createTodo, allTodo } = require("./controllers/todoController");
const dns = require("node:dns").setServers(["1.1.1.1"], ["8.8.8.8"]);
const cors = require("cors");

mongoose
  .connect(
    "mongodb+srv://root:admin123@practice.4u2mmnp.mongodb.net/class08?appName=Practice",
  )
  .then(() => {
    console.log("DB Connected");
  });

app.use(cors());

app.use(express.json());

app.post("/todo", createTodo);

app.get("/allTodo", allTodo);

app.listen(5000, () => {
  console.log("Server is running");
});
