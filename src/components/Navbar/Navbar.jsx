import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">

      <h2 className="logo">
        Tracker
      </h2>

      <div className="nav-links">

        <NavLink to="/">
          Dashboard
        </NavLink>

        <NavLink to="/goals">
          Goals
        </NavLink>

        <NavLink to="/notes">
          Notes
        </NavLink>

        <NavLink to="/habits">
          Habits
        </NavLink>

        <NavLink to="/study-tracker">
          Study Tracker
        </NavLink>

        <NavLink to="/analytics">
          Analytics
        </NavLink>

      </div>

    </nav>
  );
}

export default Navbar;