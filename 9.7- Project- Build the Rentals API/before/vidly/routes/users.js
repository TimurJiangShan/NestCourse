const _ = require('lodash');
const { User, validate } = require('../models/user');
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const router = express.Router();

router.get('/', async (req, res) => {
  const users = await User.find().sort('name');
  res.send(users);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // 不仅可以通过id来查找user，其他属性也可以
  // 如果当前用户存在，则不能注册，返回400错误
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('user already registered');

  // 只想要这3个属性
  user = new User(_.pick(req.body, ['name', 'email', 'password']));

  /*********** 给密码加盐，并覆盖掉原来的password *************/
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  /*********************************/
  await user.save();

  // pick方法可以挑选自己想要的属性，然后返回一个新的对象
  // res.send(_.pick(user, ['_id', 'name', 'email']));

  const token = jwt.sign({ _id: user._id }, config.get('jwtPrivateKey'));
  res
    .header('x-auth-token', token)
    .send(_.pick(user, ['_id', 'name', 'email']));
});

module.exports = router;
