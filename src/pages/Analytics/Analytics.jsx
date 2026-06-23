import "./Analytics.css";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Analytics() {
  const goals =
    JSON.parse(localStorage.getItem("goals")) || [];

  const habits =
    JSON.parse(localStorage.getItem("habits")) || [];

  const notes =
    JSON.parse(localStorage.getItem("notes")) || [];

  const studyTasks =
    JSON.parse(localStorage.getItem("studyTasks")) || [];

  const completedGoals = goals.filter(
    (goal) => goal.completed
  ).length;

  const completedHabits = habits.filter(
    (habit) => habit.completed
  ).length;

  const goalsProgress =
    goals.length === 0
      ? 0
      : Math.round(
          (completedGoals / goals.length) * 100
        );

  const habitsProgress =
    habits.length === 0
      ? 0
      : Math.round(
          (completedHabits / habits.length) * 100
        );

  const productivityScore = Math.round(
    (goalsProgress + habitsProgress) / 2
  );

  const totalStudyHours = studyTasks.reduce(
    (total, task) =>
      total + (task.hours || 0),
    0
  );

  // Subject Wise Hours

  const subjectHours = {};

  studyTasks.forEach((task) => {
    const subject =
      task.subject || "Other";

    if (!subjectHours[subject]) {
      subjectHours[subject] = 0;
    }

    subjectHours[subject] +=
      task.hours || 0;
  });

  const studyData = Object.keys(
    subjectHours
  ).map((subject) => ({
    subject,
    hours: subjectHours[subject],
  }));

  return (
    <div className="analytics-page">

      <h1>Analytics</h1>

      <div className="analytics-cards">

        <div className="analytics-card">
          <h3>Goals Progress</h3>
          <p>{goalsProgress}%</p>
        </div>

        <div className="analytics-card">
          <h3>Habits Progress</h3>
          <p>{habitsProgress}%</p>
        </div>

        <div className="analytics-card">
          <h3>Total Notes</h3>
          <p>{notes.length}</p>
        </div>

        <div className="analytics-card">
          <h3>Study Tasks</h3>
          <p>{studyTasks.length}</p>
        </div>

        <div className="analytics-card">
          <h3>Total Study Hours</h3>
          <p>{totalStudyHours}</p>
        </div>

        <div className="analytics-card">
          <h3>Productivity Score</h3>
          <p>{productivityScore}%</p>
        </div>

      </div>

      <div className="chart-container">

        <h2>
          Subject Wise Study Hours
        </h2>

        <ResponsiveContainer
          width="100%"
          height={350}
        >
          <BarChart data={studyData}>

            <XAxis
              dataKey="subject"
            />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="hours"
            />

          </BarChart>
        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default Analytics;