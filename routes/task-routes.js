const express = require("express");
const router = express.Router();

const {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
} = require("../controller/tasks-controller");

router.route("/tasks").get(getAllTasks).post(createTask);

router.route("/tasks/:id").get(getTask).patch(updateTask).delete(deleteTask);

module.exports = router;
