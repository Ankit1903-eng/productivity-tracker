import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";

import Dashboard from "./pages/Dashboard/Dashboard";
import Goals from "./pages/Goals/Goals";
import Notes from "./pages/Notes/Notes";
import Habits from "./pages/Habits/Habits";
import StudyTracker from "./pages/StudyTracker/StudyTracker";
import Analytics from "./pages/Analytics/Analytics";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>
        <Route path="/" element={<Dashboard />} />

        <Route
          path="/goals"
          element={<Goals />}
        />

        <Route
          path="/notes"
          element={<Notes />}
        />

        <Route
          path="/habits"
          element={<Habits />}
        />

        <Route
          path="/study-tracker"
          element={<StudyTracker />}
        />

        <Route
          path="/analytics"
          element={<Analytics />}
        />
      </Routes>

    </BrowserRouter>
  );
}

export default App;