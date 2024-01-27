const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const _ = require('lodash')

module.exports = (sequelize) => {
  const Status = sequelize.models.Status;

  /**
   * GET all statuses
   */
  router.get("/", auth, async (req, res) => {
    const statuses = await Status.findAll();

    res.send(statuses);
  });

  /**
   * GET a specific status by id
   */
  router.get('/:id', auth, async (req, res) => {
    const status = await Status.findAll({
        where: {
            "id": req.params.id,
        }
      })
    res.send(status);
  });

  /**
   * CREATE status
   */
  router.post('/', auth, auth, async (req, res) => {
    const status = await Status.create({
        name: req.body.name
    })
    status.save();
    res.status(201).send(status);
  });

  /**
   * UPDATE a status by id
   */
  router.put('/:id', auth, async (req, res) => {
    const updated = await Status.update(
      req.body,
      {
        where: {
          id: req.params.id
        }
      });
    res.status(202).send(updated);
  });

  /**
   * DELETE a status by id
   */
  router.delete('/:id', auth, async (req, res) => {
    const deleted = await Status.destroy({
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
