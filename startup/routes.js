const genres = require('../routes/genres');
const customers = require('../routes/customers');
const movies = require('../routes/movies');
const rentals = require('../routes/rentals');
const users = require('../routes/users');
const auth = require('../routes/auth');
const express = require('express');
const error = require('../middleware/error');

module.exports = function (app) {
  app.use(express.json());
  app.use('/api/genres', genres);
  app.use('/api/customers', customers);
  app.use('/api/movies', movies);
  app.use('/api/rentals', rentals);
  app.use('/api/users', users);
  app.use('/api/auth', auth);

  // Error handling 的function在其他middleware function的后面, 所以在其他middleware里面，当错误出现的时候，调用next(), 就会被这个error handling的middleware所捕捉
  app.use(error);
};
