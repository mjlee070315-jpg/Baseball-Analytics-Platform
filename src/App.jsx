import { useState, useEffect } from "react";


import Navbar from "./components/Navbar";

import { getTodayGames } from "./services/mlbApi";

import Home from "./pages/Home";
import Standings from "./pages/Standings";
import Analytics from "./pages/Analytics";
import Games from "./pages/Games";
import TeamDetail from "./pages/TeamDetail";
import GameDetail from "./pages/GameDetail";

import "./App.css";


function App() {


  const [page, setPage] = useState("home");


  const [selectedPlayer, setSelectedPlayer] = useState(null);


  const [selectedTeamId, setSelectedTeamId] = useState(null);


  const [selectedGame, setSelectedGame] = useState(null);

  const [games, setGames] = useState([]);

  const [stats, setStats] = useState(null);


  const [gameLog, setGameLog] = useState([]);




  // 선수 선택 함수
  const handlePlayerSelect = (player) => {

  setSelectedPlayer(player);

  setStats(null);

  setGameLog([]);

  setPage("analytics");

};

  useEffect(() => {

  async function loadGames() {

    try {

      const data = await getTodayGames();

      setGames(data);

    } catch (err) {

      console.error(err);

    }

  }

  loadGames();

}, []);





  return (


    <div className="app">


      <Navbar setPage={setPage} />






      {
        page === "home" && (


          <Home
  games={games}
  setPage={setPage}
  setSelectedGame={setSelectedGame}

  selectedPlayer={selectedPlayer}
  setSelectedPlayer={handlePlayerSelect}

  stats={stats}
  setStats={setStats}

  gameLog={gameLog}
  setGameLog={setGameLog}
/>


        )
      }







      {
        page === "standings" && (


          <Standings

            setSelectedTeamId={setSelectedTeamId}

            setPage={setPage}


          />


        )
      }







      {
        page === "teamDetail" && (


          <TeamDetail


            teamId={selectedTeamId}


            setSelectedPlayer={handlePlayerSelect}


            setPage={setPage}


          />


        )
      }







      {
        page === "games" && (


          <Games

            setSelectedGame={setSelectedGame}

            setPage={setPage}

          />


        )
      }







      {
        page === "gameDetail" && (


          <GameDetail

            game={selectedGame}

            setPage={setPage}

          />


        )
      }







      {
  page === "analytics" && (

    <Analytics

  selectedPlayer={selectedPlayer}

  stats={stats}

  gameLog={gameLog}

  setPage={setPage}

/>

  )
}




    </div>


  );


}


export default App;