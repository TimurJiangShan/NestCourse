require('express-async-errors'); // 方法1： 使用express-async-errors的包来处理error。 方式2：手写async的middleware
const mongoose = require('mongoose');
const express = require('express');
const app = express();
require('./startup/routes')(app);
const Joi = require('joi');
const config = require('config');
Joi.objectId = require('joi-objectid')(Joi);
const winston = require('winston');
require('winston-mongodb');

// 处理Uncaught Exceptions 方式1：
// process.on('uncaughtException', (ex) => {
//   console.log('WE GOT AN UNCAUGHT EXCEPTION');
//   console.log('UNHANDLED EXCEPTION! 💥 Shutting down...');
//   winston.error(ex.message, ex);
//   process.exit(1);
// });

// 处理 Uncaught Exception 方式2：
winston.handleExceptions(
  new winston.transports.File({ filename: 'error.log' }),
);

// 处理 Unhandled Rejection
process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  winston.error(err.message, err);
  process.exit(1);
});

winston.add(
  new winston.transports.File({ filename: 'error.log', level: 'error' }),
);
winston.add(
  new winston.transports.MongoDB({
    db: 'mongodb://localhost/vidly',
    level: 'info',
  }),
);

// throw new Error('Something failed');

if (!config.get('jwtPrivateKey')) {
  console.error('FATAL ERROR: jwtPrivateKey is not defined');
  process.exit(1);
}
// 用这条命令给变量赋值 export vidly_jwtPricateKey=mySecurityKey

mongoose
  .connect('mongodb://localhost/vidly')
  .then(() => console.log('Connected to MongoDB...'))
  .catch((err) => console.error('Could not connect to MongoDB...'));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
