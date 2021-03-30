const log = require('../log.js');
const config = require('../config');
const ua = require('../api/ua');
const data = require('../api/data');
const helpers = require('../helpers');

exports.fetchNew = async function (req, res) {
  log.req(req);
  if (req.query.key != config.MY_API_KEY) {
    return res.status(401).send();
  }
  try {
    const latestDate = data.trainings.getLatestDate() || config.ZERO_DATE;
    const workoutsList = await ua.workouts.all(latestDate);
    const trainingsList = helpers.workouts.mapToTrainings(workoutsList);
    const appendStatistics = data.access.appendTrainingsSorted(trainingsList);
    res.status(200).send(appendStatistics);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};