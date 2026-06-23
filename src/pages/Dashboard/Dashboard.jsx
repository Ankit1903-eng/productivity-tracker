import "./Dashboard.css";
import ProgressCard from "../../components/ProgressCard/ProgressCard";

import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

function Dashboard() {
  const {
    goals,
    habits,
    notes,
    studyTasks,
  } = useContext(AppContext);

  const totalGoals = goals.length;

  const completedGoals = goals.filter(
    (goal) => goal.completed
  ).length;

  const pendingGoals =
    totalGoals - completedGoals;

  const progress =
    totalGoals === 0
      ? 0
      : Math.round(
          (completedGoals / totalGoals) * 100
        );

  const totalStudyHours =
    studyTasks.reduce(
      (total, task) =>
        total + Number(task.hours || 0),
      0
    );

  const todayTasks =
    studyTasks.slice(-3).reverse();

  return (
    <div className="dashboard">

      <h1>Dashboard</h1>

      {/* Goals Section */}

      <div className="card-container">

        <ProgressCard
          title="🎯 Total Goals"
          value={totalGoals}
        />

        <ProgressCard
          title="✅ Completed Goals"
          value={completedGoals}
        />

        <ProgressCard
          title="📌 Pending Goals"
          value={pendingGoals}
        />

        <ProgressCard
          title="📈 Progress"
          value={`${progress}%`}
        />

      </div>

      {/* Productivity Section */}

      <div className="card-container">

        <ProgressCard
          title="🔥 Habits"
          value={habits.length}
        />

        <ProgressCard
          title="📝 Notes"
          value={notes.length}
        />

        <ProgressCard
          title="📚 Study Tasks"
          value={studyTasks.length}
        />

        <ProgressCard
          title="⏱ Study Hours"
          value={`${totalStudyHours} Hrs`}
        />

      </div>

      {/* Today's Focus */}

      <div className="focus-section">

        <h2>Today's Focus 🎯</h2>

        <div className="focus-grid">

          {todayTasks.length === 0 ? (
            <div className="focus-card">
              <p>No study tasks added yet.</p>
            </div>
          ) : (
            todayTasks.map((task) => (
              <div
                key={task.id}
                className="focus-card"
              >
                <h3>
                  📖 {task.topic}
                </h3>

                <p>
                  📚 Subject:
                  {" "}
                  {task.subject}
                </p>

                <p>
                  ⏱ Hours:
                  {" "}
                  {task.hours}
                </p>

                <p>
                  📅 {task.date}
                </p>
              </div>
            ))
          )}

        </div>

      </div>

    </div>
  );
}

export default Dashboard;