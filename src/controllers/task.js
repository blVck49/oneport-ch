const { logger } = require("../helpers/logger");
const { success, error } = require("../helpers/helper");

const Task = require("../models/task");
const { publishTask } = require("../utils/publish-task")
const { notifySubscribers } = require("../utils/notify-subscribers")


exports.create = async (req, res) => {
  logger.debug("Creating a new task");
  try {
    const routingKey = "create"
    const data = req.body
    data.createdBy = req.user._id
    await publishTask(data, routingKey)
    await notifySubscribers("task creation", data)
    return success(res, 201, data);
  } catch (err) {
    logger.error("🔥 error: %o", err);
    return error(res, 500, err);
  }
};

exports.update = async (req, res) => {
  logger.debug("Update a task");
  try {
    const data = req.body
    const routingKey = "update"
    publishTask(data, routingKey)
    await notifySubscribers("task update", data)
    return success(res, 201, "task updated successfully");
  } catch (err) {
    logger.error("🔥 error: %o", err);
    return error(res, 500, err);
  }
};

exports.fetch = async (req, res) => {
  logger.debug("Fetching all tasks");
  try {
    const task = await Task.find()
    return success(res, 201, task);
  } catch (err) {
    logger.error("🔥 error: %o", err);
    return error(res, 500, err);
  }
};

exports.get = async (req, res) => {
  logger.debug("Get a task");
  try {
    const task = await Task.findById(req.params._id)
    return success(res, 201, task);
  } catch (err) {
    logger.error("🔥 error: %o", err);
    return error(res, 500, err);
  }
};

exports.remove = async (req, res) => {
  logger.debug("delete a task");
  try {
    await Task.findByIdAndDelete(req.params._id)
    await notifySubscribers("task deleted", data)
    return success(res, 201);
  } catch (err) {
    logger.error("🔥 error: %o", err);
    return error(res, 500, err);
  }
};

exports.createTask = async (data) => {
  const task = await Task.create({
    ...data,
  });
  await task.save();
  return task
}

exports.updateTask = async (data) => {
  const task = await Task.findByIdAndUpdate(req.params._id, { ...req.body }, { new: true })
  return task
}

