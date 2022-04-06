const fs = require('fs');
const log = require('./log.js');
const config = require('./config');

exports.getAccessToken = function () {
  return fs.readFileSync('./data/user_token', {encoding:'utf8', flag:'r'}).trim();
}

exports.writeAccessToken = function (token) {
  log.info('Writing new access token...');
  fs.writeFileSync('./data/user_token', token, { encoding: 'utf8', flag: 'w' });
  log.info('New access token written successfully.');
}

exports.getRefreshToken = function () {
  return fs.readFileSync('./data/refresh_token', {encoding:'utf8', flag:'r'}).trim();
}

exports.writeRefreshToken = function (token) {
  log.info('Writing new refresh token...');
  fs.writeFileSync('./data/refresh_token', token, { encoding: 'utf8', flag: 'w' });
  log.info('New refresh token written successfully.');
}

exports.getAccessTokenAgeMs = function () {
  try {
    const tokenModificationDate = fs.statSync('./data/user_token').mtime.getTime();
    const currentDate = new Date().getTime();
    return currentDate - tokenModificationDate;
  } catch (error) {
    log.error(error);
  }
} 

exports.getId = function () {
  return config.USER_ID;
}