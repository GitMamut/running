module.exports = function (trainings) {
  const speedList = trainings.slice(-37).map(training => (Math.round(training.speed * 10)));
  const minSpeed = Math.min(...speedList);
  return {
    "index": 0,
    "chartData": speedList.map(speed => speed - minSpeed),
  };
}
