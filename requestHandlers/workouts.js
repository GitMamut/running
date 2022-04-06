const log = require('../log.js');
const config = require('../config');
const ua = require('../api/ua');
const data = require('../api/data');
const helpers = require('../helpers');
const user = require('../user.js')

exports.fetchNew = async function (req, res) {
  log.req(req);
  if (req.query.key != config.MY_API_KEY) {
    return res.status(401).send();
  }
  var response = {};
  if (user.getAccessTokenAgeMs() > config.TOKEN_MAX_AGE) {
    try {
      const newTokens = await ua.tokens.refresh();
      user.writeAccessToken(newTokens.newAccessToken);
      user.writeRefreshToken(newTokens.newRefreshToken);
      response = {
        tokensUpdated: 'success',
      }
    } catch (error) {
      console.log(error);
      res.status(500).send( {error: 'tokens update failure'} );
      return;
    }
  }
  try {
    const latestDate = data.trainings.getLatestDate() || config.ZERO_DATE;
    const workoutsList = await ua.workouts.all(latestDate);
    const trainingsList = helpers.workouts.mapToTrainings(workoutsList);
    const appendStatistics = data.access.appendTrainingsSorted(trainingsList);
    res.status(200).send({
      appendStatistics,
      ...response
    });
  } catch (error) {
    console.log(error);
    res.status(500).send( {error: 'fetching workouts failure'} );
  }
};