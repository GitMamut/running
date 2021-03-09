const fetch = require('node-fetch');
const fs = require('fs');

const config = require('../../config');
const user = require('../../user.js');

exports.all = function () {
  const params = [
    'user=' + user.id(),
    'started_after=2021-01-01-T00:00:00Z',
    'order_by=start_datetime',
  ];
  if (config.FETCH_LOCAL) {
    return fs.promises.readFile('./mock/workout.json', { encoding: 'utf8', flag: 'r' })
      .then(text => JSON.parse(text))
      .then(json => json._embedded.workouts);
  }
  return fetch('https://api.ua.com/v7.1/workout/?' + params.join('&'), {
    method: 'GET',
    headers: {
      'Api-Key': config.CLIENT_ID,
      'Authorization': 'Bearer ' + user.token(),
    },
  })
    .then(response => response.json())
    .then(json => json._embedded.workouts);
};
