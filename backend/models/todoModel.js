const mongoose = require("mongoose");
const { Schema } = mongoose;
const todoSchema = new Schema({
  task: {
    type: String,
    require: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Complete", "Block"],
    default: "Pending",
  },
  priority: {
    type: String,
    enum: ["Low", "Mid", "High"],
    require: true,
  },
});

module.exports = mongoose.model("Todo", todoSchema);
