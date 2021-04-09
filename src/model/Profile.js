let data = {
  name: "Marco",
  avatar: "https://github.com/marcoapdias.png",
  "monthly-budget": 10000,
  "days-per-week": 5,
  "hours-per-day": 5,
  "vacation-per-year": 4,
  "per-hour-value": 75,
};

module.exports = {
  get() {
    return data;
  },
  update(newData) {
    data = newData;
  },
};
