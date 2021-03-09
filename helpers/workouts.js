exports.sum = function (workoutsList) {
  return workoutsList
    .map(workout => workout.aggregates.distance_total)
    .reduce((prev, curr) => prev + curr, 0);
};