const config = require('../../config');

module.exports = function (trainings) {
  const distancePerHalfMonth = Array(37).fill(0);
  distancePerHalfMonth[36] = Math.round(config.GOAL_DISTANCE / 12 / 3);
  trainings.forEach(training => {
    const date = new Date(training.date);
    const bucket = (date.getMonth() * 3) + (monthPart(date.getDate()));
    distancePerHalfMonth[bucket] += Math.round(training.distance / 1000);
  })
  return {
    "index": 0,
    "chartData": distancePerHalfMonth,
  };
}

function monthPart(dayOfMonth) {
  if (dayOfMonth > 20) {return 2;}
  if (dayOfMonth > 10) {return 1;}
  return 0;
}
