exports.mapToTrainings = function (workoutsList) {
  return workoutsList
    .map(workout => ({
      distance: workout.aggregates.distance_total,
      date: workout.start_datetime,
    }));
};