import { useState, } from "react";
import "../styles/navbar.css";

function Navbar({ setPage }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handlePageChange = (page) => {
    setPage(page);
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img
          src="/logo.svg"
          className="navbar-logo-image"
          alt="Diamond Analytics"
        />
        <span>
          Diamond Analytics
        </span>
      </div>

      <button
        className="menu-toggle"
        onClick={() => setMenuOpen(prev => !prev)}
      >
        ☰
      </button>

      <div className={`nav-links ${menuOpen ? "active" : ""}`}>
        <button
          onClick={() => handlePageChange("home")}
        >
          Players
        </button>

        <button
          onClick={() => handlePageChange("standings")}
        >
          Standings
        </button>

        <button
          onClick={() => handlePageChange("analytics")}
        >
          Analytics
        </button>

        <button
          onClick={() => handlePageChange("games")}
        >
          Games
        </button>
      </div>
    </nav>
  );
}

export default Navbar;