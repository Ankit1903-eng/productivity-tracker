import { createContext, useState } from "react";

export const AppContext = createContext();

function AppProvider({ children }) {
  const [goals, setGoals] = useState(
    JSON.parse(localStorage.getItem("goals")) || []
  );

  const [habits, setHabits] = useState(
    JSON.parse(localStorage.getItem("habits")) || []
  );

  const [notes, setNotes] = useState(
    JSON.parse(localStorage.getItem("notes")) || []
  );

  const [studyTasks, setStudyTasks] = useState(
    JSON.parse(localStorage.getItem("studyTasks")) || []
  );

  return (
    <AppContext.Provider
      value={{
        goals,
        setGoals,

        habits,
        setHabits,

        notes,
        setNotes,

        studyTasks,
        setStudyTasks,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;