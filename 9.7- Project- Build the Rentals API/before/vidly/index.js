require('express-async-errors'); // 方法1： 使用express-async-errors的包来处理error。 方式2：手写async的middleware
const mongoose = require('mongoose');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');
const error = require('./middleware/error');
const express = require('express');
const app = express();
const Joi = require('joi');
const config = require('config');
Joi.objectId = require('joi-objectid')(Joi);
const winston = require('winston');

winston.add(new winston.transports.File({ filename: 'error.log' }));

if (!config.get('jwtPrivateKey')) {
  console.error('FATAL ERROR: jwtPrivateKey is not defined');
  process.exit(1);
}
// 用这条命令给变量赋值 export vidly_jwtPricateKey=mySecurityKey

mongoose
  .connect('mongodb://localhost/vidly')
  .then(() => console.log('Connected to MongoDB...'))
  .catch((err) => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);

// Error handling 的function在其他middleware function的后面, 所以在其他middleware里面，当错误出现的时候，调用next(), 就会被这个error handling的middleware所捕捉
app.use(error);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
