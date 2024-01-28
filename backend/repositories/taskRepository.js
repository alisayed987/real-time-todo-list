const _ = require('lodash')

/**
 * Get User tasks
 *
 * @param {string} userId
 * @param {Sequelize} sequelize
 * @returns Task[]
 */
module.exports.getUserTasks = async (userId, sequelize, paginationOptions) => {
  const Task = sequelize.models.Task;

  let queryObject = {
    where: { userId: userId },
    include: [
      {
        model: sequelize.models.Status,
      },
    ],
  };

  /**
   * Add and Handle tasks pagination
   */
  if (
    paginationOptions &&
    paginationOptions.page &&
    paginationOptions.pageSize
  ) {
    const { page, pageSize } = paginationOptions;
    queryObject.offset = (page - 1) * pageSize;
    queryObject.limit = pageSize;
  }

  const tasks = await Task.findAll(queryObject)
  return tasks;
};

/**
 * Get Specific User task
 *
 * @param {string} userId
 * @param {string} taskId
 * @param {Sequelize} sequelize
 * @param {Object} paginationOptions
 * @returns Task
 */
module.exports.getSpecificUserTask = async (userId, taskId, sequelize, paginationOptions) => {
  const Task = sequelize.models.Task;
  const task = await Task.findAll({
    where: {
        "id": taskId,
        "userId" : userId
    },
    include: [
      {
        model: sequelize.models.Status,
      },
    ],
  })
  return task;
}

/**
 *
 * @param {Object} data
 * @param {Sequelize} sequelize
 * @returns Task
 */
module.exports.createTask = async (userId, data, sequelize) => {
  const Task = sequelize.models.Task;
  const Status = sequelize.models.Status;

  const status = await Status.findAll({
    where: { name: data.statusName },
  });

  if (!status.length) throw new Error("No status found with this name.");

  const task = await Task.create({
    userId: userId,
    statusId: status[0].id,
    ..._.pick(data, ["title", "description"]),
  });
  task.save();

  return task;
};

/**
 *
 * @param {int} taskId
 * @param {Object} data
 * @param {Sequelize} sequelize
 * @returns boolean
 */
module.exports.updateTask = async (taskId, userId, data, sequelize) => {
  const Task = sequelize.models.Task;
  const Status = sequelize.models.Status;

  let updateBody = {};
  /**
   * Find status id if status would be updated
   */
  if (data.statusName) {
    const status = await Status.findAll({
      where: { name: data.statusName },
    });
    if (! status[0]) throw new Error('no status with this name');
    updateBody.statusId = status[0].id;
  }

  if (data.title) updateBody.title = data.title;
  if (data.description) updateBody.description = data.description;

  const isUpdated = await Task.update(updateBody, {
    where: {
      id: taskId,
      userId: userId
    },
  });

  if (!isUpdated) throw new Error("couldn't update task!");
  
  return isUpdated;
};

/**
 *
 * @param {int} taskId
 * @param {Sequelize} sequelize
 * @returns boolean
 */
module.exports.deleteTask = async (taskId, userId, sequelize) => {
  const Task = sequelize.models.Task;

  const deleted = await Task.destroy({
    where: {
      id: taskId,
      userId: userId
    },
  });

  if (!deleted) throw new Error("couldn't delete task!");

  return deleted;
};
