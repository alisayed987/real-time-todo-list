const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const _ = require('lodash')

module.exports = (sequelize) => {
  const Task = sequelize.models.Task;
  const Status = sequelize.models.Status;

  /**
   * GET authenticated user tasks
   */
  router.get("/", auth, async (req, res) => {
    /**
     * Default pagination values
     */
    let page = 1;
    let pageSize = 8;

    /**
     * Handle tasks pagination
     */
    if (pagination = req.body.pagination) {
      if (pagination.page) page = pagination.page;
      if (pagination.pageSize) pageSize = pagination.pageSize;
    }
    
    const tasks = await Task.findAll({
      where: { "userId" : req.user.id },
      include: [
        {
          model: sequelize.models.Status,
        },
      ],
      offset: ((page - 1) * pageSize),
      limit: pageSize
    });

    res.send(tasks);
  });

  /**
   * GET a specific task by id
   */
  router.get('/:id', auth, async (req, res) => {
    const task = await Task.findAll({
        where: {
            "id": req.params.id,
            "userId" : req.user.id
        },
        include: [
          {
            model: sequelize.models.Status,
          },
        ],
      })
    res.send(task[0] ?? null);
  });

  /**
   * CREATE task
   */
  router.post('/', auth, auth, async (req, res) => {
    const status = await Status.findAll({
        where: { "name" : req.body.statusName },
      });

      console.log(status);
    if (!status.length) res.status(400).send("No status found with this name.") 

    const task = await Task.create({
        userId: req.user.id,
        statusId: status[0].id,
        ..._.pick(req.body, ['title', 'description'])
    })
    task.save();
    res.status(201).send(task);
  });

  /**
   * UPDATE a task by id
   */
  router.put('/:id', auth, async (req, res) => {
    const updated = await Task.update(
      req.body,
      {
        where: {
          id: req.params.id
        }
      });
    res.status(202).send(updated);
  });

  /**
   * DELETE a task by id
   */
  router.delete('/:id', auth, async (req, res) => {
    const deleted = await Task.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!deleted) {
      res.status(404).send("No matching id to delete");
      return;
    }

    res.status(200).send("Deleted");
  });

  return router;
};
