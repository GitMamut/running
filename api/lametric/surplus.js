const config = require('../../config');

const KM_PER_DAY = config.GOAL_DISTANCE / 365;

module.exports = function (currentDistance) {
  const currentDistanceKm = Math.round(currentDistance / 1000);
  const plannedDistance = getDayOfMonthToday() * KM_PER_DAY;
  const difference = Math.round(currentDistanceKm - plannedDistance);
  return {
    "text": Math.abs(difference) + ' km',
    "icon": getIcon(difference)
  };
}

const getDayOfMonthToday = () => {
  const startMilliseconds = Date.parse(config.ZERO_DATE);
  const endMilliseconds = new Date().getTime();
  return Math.floor(endMilliseconds - startMilliseconds) / (60 * 60 * 24 * 1000);
}

const getIcon = (difference) => {
  if (difference > 0) {
    return 120;
  }
  if (difference < 0) {
    return 124
  }
  return 401;
}