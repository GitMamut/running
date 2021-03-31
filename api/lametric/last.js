const DAY_ICONS = [26474, 26477, 26478, 26479, 26475, 26480, 26481];

exports.date = function (training) {
  const date = new Date(training.date);
  return {
    "text": `${('0' + (date.getDate())).slice(-2)}/${('0' + (date.getMonth() + 1)).slice(-2)}`,
    "icon": DAY_ICONS[date.getDay()],
  };
}