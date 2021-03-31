const { access } = require('.');

exports.getLatestDate = function () {
  if (access.getTrainings().length === 0) {
    return undefined;
  }
  return access.getTrainings()[0].date;
}

exports.getSum = function (year) {
  return access.getTrainings()
    .filter(training => training.date.startsWith(year))
    .map(training => training.distance)
    .reduce((prev, curr) => prev + curr, 0);
}