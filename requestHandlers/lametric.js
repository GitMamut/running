const log = require('../log.js');
const config = require('../config');
const lametric = require('../api/lametric');
const data = require('../api/data');

exports.all = async function (req, res) {
  log.req(req);
  if (req.query.key != config.MY_API_KEY) {
    return res.status(401).send();
  }
  const distanceSumPerYear = data.trainings.getSum(config.YEAR);
  res.status(200).send({
    frames: [
      lametric.yearlyGoal(distanceSumPerYear),
      lametric.yearlySummary(data.trainings.getAll(config.YEAR)),
      lametric.surplus(distanceSumPerYear),
    ]
  });
};

exports.last = async function (req, res) {
  log.req(req);
  if (req.query.key != config.MY_API_KEY) {
    return res.status(401).send();
  }
  const training = data.trainings.getLast();
  res.status(200).send({
    frames: [
      lametric.last.date(training),
      lametric.last.distance(training),
      lametric.last.duration(training),
      lametric.last.pace(training),
      lametric.last.speed(training),
    ]
  });
};