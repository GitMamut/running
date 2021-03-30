const fs = require('fs');

const log = require('../../log.js');

exports.getTrainings = function () {
  let trainingsJSON = [];
  try {
    const trainingsRaw = fs.readFileSync('./data/trainings.json', { encoding: 'utf8', flag: 'r' }).trim();
    trainingsJSON = JSON.parse(trainingsRaw);
    if (!Array.isArray(trainingsJSON)) {
      throw new Error('Read file is not an array!');
    }
  } catch (error) {
    log.error(error);
    return [];
  }
  return trainingsJSON;
}

exports.appendTrainingsSorted = function (newTrainings = []) {
  const oldTrainings = exports.getTrainings();
  const mergedUniqueTrainingsSorted = [...newTrainings, ...oldTrainings]
    .sort(dateCompareFn)
    .filter(uniquePredicate());
  try {
    fs.writeFileSync('./data/trainings.json', JSON.stringify(mergedUniqueTrainingsSorted), { encoding: 'utf8', flag: 'w' });
  } catch (error) {
    log.error(error);
  }
  return {
    old: oldTrainings.length,
    new: newTrainings.length,
    added: mergedUniqueTrainingsSorted.length - oldTrainings.length,
    duplicated: newTrainings.length + oldTrainings.length - mergedUniqueTrainingsSorted.length,
    result: mergedUniqueTrainingsSorted.length,
  };
}

const uniquePredicate = () => {
  const dates = new Set();
  return (training) => {
    if (!dates.has(training.date)) {
      dates.add(training.date);
      return true;
    }
  }
};

const dateCompareFn = (a, b) => {
  if (a.date > b.date) return -1;
  if (a.date < b.date) return 1;
  return 0
}