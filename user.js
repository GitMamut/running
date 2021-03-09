const fs = require('fs');
const config = require('./config');

exports.token = function () {
  return fs.readFileSync('./data/user_token', {encoding:'utf8', flag:'r'});
}

exports.id = function () {
  return config.USER_ID;
}