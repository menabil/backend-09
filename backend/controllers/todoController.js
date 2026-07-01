const Todo = require("../models/todoModel");

const createTodo = async (req, res) => {
  const { task, priority, status } = req.body;

  if (!task || !priority) {
    return res.send({
      success: false,
      message: "All fields require",
    });
  }

  const todo = new Todo({
    task: task,
    priority: priority,
  });

  await todo.save();

  res.send({
    success: true,
    message: "Todo Created",
  });
};

const allTodo = async (req, res) => {
  let data = await Todo.find({});
  res.send({
    success: true,
    message: "Todo Collected",
    data: data,
  });
};

module.exports = { createTodo, allTodo };
