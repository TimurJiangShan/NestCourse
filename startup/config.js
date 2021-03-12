const config = require('config');

module.exports = function () {
  // 用这条命令给变量赋值 export vidly_jwtPricateKey=mySecurityKey
  if (!config.get('jwtPrivateKey')) {
    throw new Error('FATAL ERROR: jwtPrivateKey is not defined');
  }
};
