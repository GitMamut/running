const log = require('../log.js');
const config = require('../config');
const ua = require('../api/ua');
const lametric = require('../api/lametric');
const helpers = require('../helpers');

exports.all = async function (req, res) {
  log.req(req);
  if (req.query.key != config.MY_API_KEY) {
    return res.status(401).send();
  }
  try {
    const workoutsList = await ua.workouts.all();
    const distanceSum = helpers.workouts.sum(workoutsList);
    res.status(200).send(lametric.yearlyGoal(distanceSum));
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};