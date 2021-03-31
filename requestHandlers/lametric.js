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
      lametric.surplus(distanceSumPerYear, data.trainings.getLatestDate()),
    ]
  });
};