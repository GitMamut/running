module.exports = function (trainings) {
  var speedList = trainings
    .reverse()
    .slice(-37)
    .map(training => (Math.round(training.speed * 10)));

  const minSpeed = Math.min(...speedList);
  speedList = speedList.map(speed => speed - minSpeed)
  if (speedList.length < 37) {
    speedList = [...speedList, ...Array(37 - speedList.length).fill(0)]
  }
  return {
    "index": 0,
    "chartData": speedList,
  };
}
