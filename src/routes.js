const { req, res } = require("express");
const express = require("express");
const routes = express.Router();

const views = __dirname + "/views/";

const Profile = {
    data: {
        name: "Marco",
        avatar: "https://github.com/marcoapdias.png",
        "monthly-budget": 10000,
        "days-per-week": 5,
        "hours-per-day": 5,
        "vacation-per-year": 4,
        "per-hour-value": 75
    },
    controllers: {
        index(req, res) {

            return res.render(views + "profile", { profile: Profile.data })

        },

        update(req, res) {



            Profile.data.name = req.body.name;
            Profile.data.avatar = req.body.avatar;
            Profile.data["monthly-budget"] = req.body["monthly-budget"];
            Profile.data["days-per-week"] = req.body["days-per-week"];
            Profile.data["vacation-per-year"] = req.body["vacation-per-year"];
            Profile.data["hours-per-day"] = req.body["hours-per-day"];

            // Calculo do valor da hora
            // calcular o salario anual
            const yearlySalary = Profile.data["monthly-budget"] * 12;
            // remover as semanas de férias do total de semanas do ano
            const workingWeeksPerYear = 52 - Profile.data["vacation-per-year"];
            // Dividir o salario anual pelo nro de semanas
            const weeklySalary = yearlySalary / workingWeeksPerYear;
            // Dividir o salario semanal pelo dias de trab na semana
            const dailySalary = weeklySalary / Profile.data["days-per-week"];
            // Dividir o valor por dia pelo nro de horas do dia
            Profile.data["per-hour-value"] = (dailySalary / Profile.data["hours-per-day"]).toFixed();

            return res.redirect('/profile');

        }

    },
}

const Job = {
    data: [
        {
            id: 1,
            name: "Pizzaria Guloso",
            "daily-hours": 2,
            "total-hours": 60,
            created_at: Date.now()
        },
        {
            id: 2,
            name: "OneTwo Project",
            "daily-hours": 3,
            "total-hours": 47,
            created_at: Date.now()
        },
    ],
    controllers: {
        index(req, res) {

            const updatedJobs = Job.data.map((job) => {

                const remaining = Job.services.remainingDays(job);
                const status = remaining <= 0 ? "done" : "progress";

                return {
                    ...job,
                    remaining,
                    status,
                    budget: Profile.data["per-hour-value"] * job["total-hours"]
                }
            })

            return res.render(views + "index", { jobs: updatedJobs });

        },
        create(req, res) {

            return res.render(views + "job");

        },
        save(req, res) {

            const lastId = Job.data[Job.data.length - 1]?.id || 1;

            jobs.push({
                id: lastId + 1,
                name: req.body.name,
                "daily-hours": req.body["daily-hours"],
                "total-hours": req.body["total-hours"],
                created_at: Date.now()
            });

            return res.redirect('/');

        }
    },
    services: {
        remainingDays(job) {

            const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed();

            const createdDate = new Date(job.created_at);

            const dueDay = createdDate.getDate() + Number(remainingDays);
            const dueDate = createdDate.setDate(dueDay);

            const timeDiffInMs = dueDate - Date.now();

            const dayInMs = 1000 * 60 * 60 * 24;
            const dayDiff = Math.floor(timeDiffInMs / dayInMs);

            return dayDiff;
        },
    },
}


routes.get('/', Job.controllers.index);
routes.get('/job', Job.controllers.create);
routes.post('/job', Job.controllers.save);

routes.get('/job/edit', (req, res) => res.render(views + "job-edit"));
routes.get('/profile', Profile.controllers.index);
routes.post('/profile', Profile.controllers.update);

module.exports = routes;