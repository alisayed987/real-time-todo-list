const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const { createTaskSchema, updateTaskSchema } = require('../validations/tasks.js')
const validate = require('../middlewares/validate.js')
const {
  getUserTasks,
  getSpecificUserTask,
  createTask,
  updateTask,
  deleteTask,
} = require("../repositories/taskRepository.js");

module.exports = (sequelize) => {
  const Task = sequelize.models.Task;
  const Status = sequelize.models.Status;

  /**
   * GET authenticated user tasks
   */
  router.get("/", auth, async (req, res) => {
    const tasks = await getUserTasks(req.user.id, sequelize);
    res.send(tasks);
  });

  /**
   * GET a specific task by id
   */
  router.get('/:id', auth, async (req, res) => {
    const task = await getSpecificUserTask(req.user.id, req.params.id);
    res.send(task[0] ?? null);
  });

  /**
   * CREATE task
   */
  router.post('/', validate(createTaskSchema), auth, async (req, res) => {
    const task = await createTask(req.user.id, req.body, sequelize)
    res.status(201).send(task);
  });

  /**
   * UPDATE a task by id
   */
  router.put('/:id', validate(updateTaskSchema), auth, async (req, res) => {
    const updated = await updateTask(req.params.id, req.user.id, req.body, sequelize);
    res.status(202).send(updated);
  });

  /**
   * DELETE a task by id
   */
  router.delete('/:id', auth, async (req, res) => {
    await deleteTask(req.params.id, req.user.id, sequelize);
    res.status(200).send("Deleted");
  });

  return router;
};
