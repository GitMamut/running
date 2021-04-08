const DAY_ICONS = [26474, 26477, 26478, 26479, 26475, 26480, 26481];

exports.date = function (training) {
  const date = new Date(training.date);
  return {
    "text": `${('0' + (date.getDate())).slice(-2)}/${('0' + (date.getMonth() + 1)).slice(-2)}`,
    "icon": DAY_ICONS[date.getDay()],
  };
}

exports.distance = function (training) {
  return {
    "text": `${(training.distance / 1000).toFixed(2)} km`,
    "icon": null,
  };
}

exports.duration = function (training) {
  const hours = Math.floor(training.time / 3600);
  const minutes = ('0' + Math.floor(training.time / 60) % 60).slice(-2);
  const seconds = ('0' + training.time % 60).slice(-2);
  return {
    "text": `${hours}:${minutes}:${seconds}`,
    "icon": 1825,
  };
}

exports.pace = function (training) {
  const paceDecimal = training.time * 1000 / training.distance / 60;
  const minutes = Math.floor(paceDecimal);
  const seconds = Math.floor((paceDecimal * 60) % 60);
  return {
    "text": `${minutes}:${seconds} min/km`,
    "icon": null,
  };
}
exports.speed = function (training) {
  return {
    "text": `${(training.speed * 3.6).toFixed(1)} km/h`,
    "icon": null,
  };
}