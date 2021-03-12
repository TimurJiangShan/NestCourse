require('winston-mongodb');
const winston = require('winston');
require('express-async-errors'); // 方法1： 使用express-async-errors的包来处理error。 方式2：手写async的middleware

module.exports = function () {
  // 处理Uncaught Exceptions 方式1：
  // process.on('uncaughtException', (ex) => {
  //   console.log('WE GOT AN UNCAUGHT EXCEPTION');
  //   console.log('UNHANDLED EXCEPTION! 💥 Shutting down...');
  //   winston.error(ex.message, ex);
  //   process.exit(1);
  // });

  // 处理 Uncaught Exception 方式2：
  winston.handleExceptions(
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
    new winston.transports.File({ filename: 'uncaughtException.log' }),
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
  // winston.add(
  //   new winston.transports.MongoDB({
  //     db: 'mongodb://localhost/vidly',
  //     level: 'info',
  //   }),
  // );

  // throw new Error('Something failed');
};
