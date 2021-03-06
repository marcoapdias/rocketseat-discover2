const Profile = require("../model/Profile");

module.exports = {
  index(req, res) {
    return res.render("profile", { profile: Profile.get() });
  },

  update(req, res) {
    // Calculo do valor da hora
    // calcular o salario anual
    const yearlySalary = req.body["monthly-budget"] * 12;
    // remover as semanas de férias do total de semanas do ano
    const workingWeeksPerYear = 52 - req.body["vacation-per-year"];
    // Dividir o salario anual pelo nro de semanas
    const weeklySalary = yearlySalary / workingWeeksPerYear;
    // Dividir o salario semanal pelo dias de trab na semana
    const dailySalary = weeklySalary / req.body["days-per-week"];
    // Dividir o valor por dia pelo nro de horas do dia
    const perHourValue = dailySalary / req.body["hours-per-day"];

    Profile.update({
      ...Profile.get(),
      ...req.body,
      "per-hour-value": perHourValue,
    });

    return res.redirect("/profile");
  },
};
