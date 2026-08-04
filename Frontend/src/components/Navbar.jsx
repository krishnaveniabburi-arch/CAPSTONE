import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h2> Patient Care Portal</h2>
      </div>

      <ul className="navbar-links">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "active-link" : ""
            }
          >
            Dashboard
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/add-patient"
            className={({ isActive }) =>
              isActive ? "active-link" : ""
            }
          >
            Add Patient
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;