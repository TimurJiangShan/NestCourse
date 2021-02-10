const express = require('express');
const winston = require('winston');
const app = express();

require('./startup/logging'); // logging 这个文件要放在最前面，以便于捕捉错误
require('./startup/validation')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();

const port = process.env.PORT || 3000;
app.listen(port, () => winston.info(`Listening on port ${port}...`));
