const bcrypt = require('bcrypt');
const express = require('express');
const _ = require('lodash')
const router = express.Router();

module.exports = (sequelize) => {
  const User = sequelize.models.User;

  /**
   * req: Login using email & password
   * res: jwt token
   */
  router.post('/login', async (req, res) => {
    const user = await User.findOne({ where: { email: req.body.email }});
    if (!user) return res.status(400).send('Invalid email or password.');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid email or password.');

    const token = user.generateAuthToken();
    res.send(token);
  });

  /**
   * req: Register using name & email & password & phone_number
   * res: new user + header token
   */
  router.post('/register', async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash(req.body.password, salt);

      const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: password,
      });

      const token = user.generateAuthToken();
      res.header('x-auth-token', token).send(_.pick(user, ['id', 'name', 'email']));
    } catch (error) {
      res.status(500).send(error);
    }
  });

  return router;
}
