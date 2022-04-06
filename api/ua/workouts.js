const fetch = require('node-fetch');
const fs = require('fs');

const log = require('../../log.js');
const config = require('../../config');
const user = require('../../user.js');

exports.all = function (startedAfter = config.ZERO_DATE) {
  const params = [
    'user=' + user.getId(),
    'started_after=' + startedAfter,
    'order_by=start_datetime',
    'limit=4',
  ];
  if (config.FETCH_LOCAL) {
    log.info(`ua/workouts/all mock from ./mock/workout.json`);
    return fs.promises.readFile('./mock/workout.json', { encoding: 'utf8', flag: 'r' })
      .then(text => JSON.parse(text))
      .then(json => json._embedded.workouts);
  }
  const url = 'https://api.ua.com/v7.1/workout/?' + params.join('&');
  const headers = {
    'Api-Key': config.CLIENT_ID,
    'Authorization': 'Bearer ' + user.getAccessToken(),
  };
  log.info(`ua/workouts/all ${url}, ${JSON.stringify(headers)}`);
  return fetch(url, { method: 'GET', headers: headers })
    .then(response => {
      log.info(`ua/workouts/all response status: ${response.status}`);
      if (response.status != 200) {
        throw new Error(`ua/workouts/all response ERROR!`);
      }
      return response.json()
    })
    .then(json => {
      log.info(`ua/workouts/all response json: ${JSON.stringify(json._embedded.workouts)}`);
      return json._embedded.workouts;
    })
};
