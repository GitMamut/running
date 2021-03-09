const config = require('../../config');

module.exports = function (currentDistance) {
  const distanceKm = Math.round(currentDistance / 1000);
  return {
    "frames": [
      {
        "goalData": {
          "start": 0,
          "current": distanceKm,
          "end": config.GOAL_DISTANCE,
          "unit": "km"
        },
        "icon": 22835
      }
    ]
  };
}