const Task = require("../models/task");
const { createCustomError } = require("../errors/custom-error");

const getAllTasks = async (req, res, next) => {
  try {
    const { userID } = req.user;
    const tasks = await Task.find({ createdBy: userID });
    res.status(200).json({ tasks });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const createTask = async (req, res, next) => {
  try {
    const { name } = req.body;
    const { userID } = req.user;
    const result = await Task.create({ createdBy: userID, name });
    res.json({ result });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getTask = async (req, res, next) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findById({ _id: taskID });
    if (!task) {
      return next(createCustomError(`no task found with ID: ${taskID}`, 404));
    }
    res.json({ task });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
const updateTask = async (req, res, next) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findByIdAndUpdate({ _id: taskID }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      return next(createCustomError(`no task found with ID: ${taskID}`, 404));
    }
    res.json({ task });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
const deleteTask = async (req, res, next) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findByIdAndDelete({ _id: taskID });
    if (!task) {
      return next(createCustomError(`no task found with ID: ${taskID}`, 404));
    }
    res.json({ task });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
