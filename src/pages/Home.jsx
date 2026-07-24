import { useState, useRef, useEffect } from "react";

import "../styles/hero.css";

import {
  searchPlayers,
  getPlayerDetails,
  getPlayerStats,
  getPlayerGameLog,
} from "../services/mlbApi";


import SearchBar from "../components/SearchBar";
import PlayerCard from "../components/PlayerCard";
import PlayerProfile from "../components/PlayerProfile";
import StatsChart from "../components/StatsChart";
import PerformanceChart from "../components/PerformanceChart";
import CompareCard from "../components/CompareCard";
import GameCard from "../components/GameCard";
import PlayerModal from "../components/PlayerModal";

function Home({

  games,
  setPage,
  setSelectedGame,

  selectedPlayer,
  setSelectedPlayer,

  stats,
  setStats,

  gameLog,
  setGameLog

}) {


  const [search, setSearch] = useState("");

  const [players, setPlayers] = useState([]);
  
  const [trendingPlayers, setTrendingPlayers] = useState([]);

  const [modalPlayer, setModalPlayer] = useState(null);

useEffect(()=>{


  const loadTrendingPlayers = async()=>{


    const ids = [

      660271, // Shohei Ohtani
      592450, // Aaron Judge
      665742, // Juan Soto
      605141  // Mookie Betts

    ];



    const data = await Promise.all(

      ids.map(async(id)=>{


        const player = await getPlayerDetails(id);

        const stats = await getPlayerStats(id);



        return {

  ...player,

  headshot:
  `https://img.mlbstatic.com/mlb-photos/image/upload/w_213,q_auto:best/v1/people/${id}/action/vertical/current`,

  stats

};


      })

    );



    setTrendingPlayers(data);


  };



  loadTrendingPlayers();


},[]);


  const [compareSearch, setCompareSearch] = useState("");

  const [comparePlayer, setComparePlayer] = useState(null);

  const [compareStats, setCompareStats] = useState(null);



  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");



  const profileRef = useRef();





  const handleSearch = async()=>{


    if(search.trim()==="") return;


    setLoading(true);

    setError("");



    try{


      const result = await searchPlayers(search);



      if(result.length===0){


        setPlayers([]);

        setError(
          "No player found. Try another name."
        );


      } else {


        setPlayers(result);


      }



    } catch(error){


      console.error(error);

      setError(
        "Something went wrong."
      );


    }



    setLoading(false);


  };








  const handlePlayerClick = async(player)=>{


  const playerData = await getPlayerDetails(player.id);


  const statsData = await getPlayerStats(player.id);


  const logData = await getPlayerGameLog(player.id);



  setSelectedPlayer(playerData);


  setStats(statsData);


  setGameLog(logData);



  setModalPlayer({

    ...playerData,

    headshot:
    playerData.image ||
    `https://img.mlbstatic.com/mlb-photos/image/upload/w_213,q_auto:best/v1/people/${playerData.id}/action/vertical/current`,

    stats: statsData

  });



  setPage("analytics");


};









  const handleCompareSearch = async()=>{


    if(compareSearch.trim()==="") return;



    const result = await searchPlayers(compareSearch);



    if(result.length>0){


      const playerData =
        await getPlayerDetails(result[0].id);



      const statsData =
        await getPlayerStats(result[0].id);



      setComparePlayer(playerData);

      setCompareStats(statsData);


    }


  };








  return (

    <>


      <section className="hero">


  <div className="hero-content">


    <h1>

      Diamond Analytics

    </h1>



    <h2>

      Advanced MLB Analytics Platform

    </h2>



    <p>

      Search MLB players, explore real-time statistics,
      and analyze performance with MLB data.

    </p>



    <SearchBar

      search={search}

      setSearch={setSearch}

      onSearch={handleSearch}

    />


  </div>


</section>

      <section className="today-games-section">

  <div className="today-header">

    <div>
      <h2>Today's Games</h2>
      <p>Live scores, scheduled games and finals</p>
    </div>


    <button
      className="view-all-btn"
      onClick={() => setPage("games")}
    >
      View All →
    </button>

  </div>


  {games?.length > 0 && (

    <div className="today-games-scroll">

      {games.slice(0,6).map((game)=>(

        <GameCard

          key={game.gamePk}

          game={game}

          onClick={(selectedGame)=>{

            setSelectedGame(selectedGame);

            setPage("gameDetail");

          }}

        />

      ))}

    </div>

  )}

</section>





<section className="trending-section">


  <div className="today-header">

    <div>

      <h2>🔥 Trending Players</h2>

      <p>Top MLB superstars</p>

    </div>

  </div>



  <div className="trending-grid">


    {
      trendingPlayers.map((player)=>(

        <PlayerCard

          key={player.id}

          player={player}

          onClick={handlePlayerClick}

        />

      ))
    }


  </div>


</section>







      <main className="container">






        {loading && (

          <h3 className="loading">

            Searching MLB Database...

          </h3>

        )}







        {error && (

          <h3 className="error">

            {error}

          </h3>

        )}








        {
          players.length>0 && (


            <section className="results-section">


              <div className="section-header">


                <span></span>


                <div>


                  <h2>

                    Search Results

                  </h2>



                  <p>

                    Find MLB players and explore analytics

                  </p>


                </div>


              </div>







              <div className="stats-grid">


                {
                  players.map((player)=>(


                    <PlayerCard


                      key={player.id}


                      player={player}


                      onClick={handlePlayerClick}


                    />


                  ))
                }


              </div>



            </section>


          )
        }








        {
          selectedPlayer && (


            <div ref={profileRef}>


              <PlayerProfile

                player={selectedPlayer}

                stats={stats}

                currentSeason={2026}

              />


            </div>


          )
        }








        {
          selectedPlayer && (


            <section className="compare-section">


              <div className="section-header">


                <span></span>


                <div>


                  <h2>

                    Compare Player

                  </h2>


                  <p>

                    Compare another MLB player

                  </p>


                </div>


              </div>







              <div className="search-container">


                <input


                  className="search"


                  placeholder="Search player to compare..."


                  value={compareSearch}


                  onChange={(e)=>
                    setCompareSearch(e.target.value)
                  }


                />




                <button


                  className="search-button"


                  onClick={handleCompareSearch}


                >

                  Compare


                </button>



              </div>



            </section>


          )
        }









        {
          stats && (


            <section className="analytics-section">


              <div className="section-header">


                <span></span>


                <div>


                  <h2>

                    Player Analytics

                  </h2>


                  <p>

                    Performance charts powered by MLB Stats API

                  </p>


                </div>


              </div>







              <StatsChart

                stats={stats}

              />




              <PerformanceChart

                gameLog={gameLog}

              />







              {
                comparePlayer && compareStats && (


                  <CompareCard


                    player1={selectedPlayer}


                    player2={comparePlayer}


                    stats1={stats}


                    stats2={compareStats}


                  />


                )
              }






            </section>


          )
        }






                   </main>


        {
          modalPlayer && (

            <PlayerModal

              player={modalPlayer}

              onClose={()=>setModalPlayer(null)}

              setPage={setPage}

              setSelectedPlayer={setSelectedPlayer}

            />

          )
        }


    </>

  );

}



export default Home;
