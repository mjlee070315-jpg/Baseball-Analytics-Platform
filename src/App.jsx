import { useState } from "react";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Standings from "./pages/Standings";
import Analytics from "./pages/Analytics";
import Games from "./pages/Games";
import TeamDetail from "./pages/TeamDetail";

import "./App.css";


function App() {


  const [page, setPage] = useState("home");


  const [selectedPlayer, setSelectedPlayer] = useState(null);


  const [selectedTeamId, setSelectedTeamId] = useState(null);


  const [stats, setStats] = useState(null);


  const [gameLog, setGameLog] = useState([]);




  // 선수 선택 함수
  const handlePlayerSelect = (player) => {


    setSelectedPlayer(player);


    // 기존 데이터 초기화

    setStats(null);

    setGameLog([]);


    // 선수 프로필 화면으로 이동

    setPage("home");


  };





  return (


    <div className="app">


      <Navbar setPage={setPage} />





      {
        page === "home" && (


          <Home

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
        page === "analytics" && (


          <Analytics


            stats={stats}

            gameLog={gameLog}


          />


        )
      }







      {
        page === "games" && (


          <Games />


        )
      }





    </div>


  );


}


export default App;