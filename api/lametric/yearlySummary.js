const config = require('../../config');

module.exports = function (trainings) {
  const distancePerHalfMonth = Array(37).fill(0);
  distancePerHalfMonth[36] = config.GOAL_DISTANCE / 12 / 3;
  trainings.forEach(training => {
    const date = new Date(training.date);
    const basket = (date.getMonth() * 3) + (date.getDate() > 14 ? 1 : 0);
    distancePerHalfMonth[basket] += Math.round(training.distance / 1000);
  })
  return {
    "index": 0,
    "chartData": distancePerHalfMonth,
  };
}