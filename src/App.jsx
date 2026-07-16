import { useState } from "react";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Standings from "./pages/Standings";
import Analytics from "./pages/Analytics";
import Games from "./pages/Games";

import "./App.css";

function App() {

  const [page, setPage] = useState("home");

  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [stats, setStats] = useState(null);
  const [gameLog, setGameLog] = useState([]);

  return (

    <div className="app">

      <Navbar setPage={setPage} />

      {page === "home" && (

        <Home
          selectedPlayer={selectedPlayer}
          setSelectedPlayer={setSelectedPlayer}
          stats={stats}
          setStats={setStats}
          gameLog={gameLog}
          setGameLog={setGameLog}
        />

      )}

      {page === "standings" && (

        <Standings />

      )}

      {page === "analytics" && (

        <Analytics
          stats={stats}
          gameLog={gameLog}
        />

      )}

      {page === "games" && (

        <Games />

      )}

    </div>

  );

}

export default App;