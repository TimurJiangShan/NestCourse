const _ = require('lodash');
const { User } = require('../models/user');
const mongoose = require('mongoose');
const Joi = require('joi');
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const router = express.Router();

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Invalid user or password');

  /*********** 密码验证： 给req的password加盐，然后和数据库里的password进行比较 *************/
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Invalid user or password');
  /*********************************/
  const token = jwt.sign({ _id: user._id }, config.get('jwtPrivateKey'));
  res.send(token);
});

function validate(req) {
  const schema = {
    email: Joi.string().min(3).max(50).email().required(),
    password: Joi.string().min(5).max(255).required(),
  };

  return Joi.validate(req, schema);
}

module.exports = router;
