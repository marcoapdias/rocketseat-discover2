const Job = require("../model/Job");
const JobUtils = require("../Utils/JobUtils");
const Profile = require("../model/Profile");

module.exports = {
  index(req, res) {
    const jobs = Job.get();
    const profileData = Profile.get();

    let statusCount = {
      progress: 0,
      done: 0,
      total: jobs.length
    }

    let jobTotalHours = 0;

    const updatedJobs = jobs.map((job) => {
      const remaining = JobUtils.remainingDays(job);
      const status = remaining <= 0 ? "done" : "progress";

      statusCount[status] += 1;

      jobTotalHours += (status === "progress") ? Number(job["daily-hours"]) : 0;
        
      return {
        ...job,
        remaining,
        status,
        budget: JobUtils.calculateBudget(job, profileData["per-hour-value"]),
      };
    });

    const freeHours = profileData["hours-per-day"] - jobTotalHours;

    return res.render("index", { jobs: updatedJobs, profile: profileData, statusCount: statusCount, freeHours: freeHours });
  },
};
