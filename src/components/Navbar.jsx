function Navbar({ setPage }) {

  return (

    <nav className="navbar">

      <div className="navbar-logo">
        ⚾ MLB Analytics
      </div>

      <div className="nav-links">

        <button
          onClick={() => {
            console.log("HOME");
            setPage("home");
          }}
        >
          Players
        </button>

        <button
          onClick={() => {
            console.log("STANDINGS");
            setPage("standings");
          }}
        >
          Standings
        </button>

        <button
          onClick={() => {
            console.log("ANALYTICS");
            setPage("analytics");
          }}
        >
          Analytics
        </button>

        <button
          onClick={() => {
            console.log("GAMES");
            setPage("games");
          }}
        >
          Games
        </button>

      </div>

    </nav>

  );

}

export default Navbar;