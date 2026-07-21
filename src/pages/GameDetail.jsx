import { useEffect, useState } from "react";

import {
  getGameLive
} from "../services/mlbApi";
import teamColors from "../utils/teamColors";


function GameDetail({

  game,

  setPage

}) {


  const [liveData, setLiveData] = useState(null);



  useEffect(()=>{


    async function loadGame(){


      if(!game?.gamePk) return;


      try{


        const data = await getGameLive(
          game.gamePk
        );


        console.log(
          "LIVE GAME DATA:",
          data
        );


        setLiveData(data);


      }catch(error){


        console.error(
          "GAME DETAIL ERROR:",
          error
        );


      }


    }


    loadGame();


  },[game]);







  if(!game){


    return (

      <div className="loading">

        No Game Selected

      </div>

    );

  }







  const awayTeam =
    game.teams?.away?.team;


  const homeTeam =
    game.teams?.home?.team;





  if(!awayTeam || !homeTeam){


    return (

      <div className="loading">

        Invalid Game Data

      </div>

    );

  }






  const awayLogo =
    `https://www.mlbstatic.com/team-logos/${awayTeam.id}.svg`;



  const homeLogo =
    `https://www.mlbstatic.com/team-logos/${homeTeam.id}.svg`;

    const awayColor =
  teamColors[awayTeam.id]?.primary || "#1e3a8a";

const homeColor =
  teamColors[homeTeam.id]?.primary || "#dc2626";






  const gameTime =
    new Intl.DateTimeFormat(
      "en-US",
      {

        month:"short",

        day:"numeric",

        year:"numeric",

        hour:"numeric",

        minute:"2-digit",

        hour12:true

      }

    ).format(

      new Date(game.gameDate)

    );







  const linescore =
    liveData
      ?.liveData
      ?.linescore;



  const currentInning =
    linescore?.currentInning ?? "-";



  const innings =
    linescore?.innings ?? [];
    const boxscore =
  liveData?.liveData?.boxscore;

const awayBatters =
  boxscore?.teams?.away?.players ?? {};

const homeBatters =
  boxscore?.teams?.home?.players ?? {};

  const awayBatting =
  Object.values(awayBatters).filter(
    player => player?.stats?.batting
  );

const homeBatting =
  Object.values(homeBatters).filter(
    player => player?.stats?.batting
  );





  const probablePitchers =
    liveData
      ?.gameData
      ?.probablePitchers;
      const offense = linescore?.offense;
const defense = linescore?.defense;

const balls = linescore?.balls ?? "-";
const strikes = linescore?.strikes ?? "-";
const outs = linescore?.outs ?? "-";

const batter =
  offense?.batter?.fullName ?? "-";

const pitcher =
  defense?.pitcher?.fullName ?? "-";

const first = offense?.first;
const second = offense?.second;
const third = offense?.third;






  return (


    <main className="game-detail-page">



      <button

        className="back-button"

        onClick={()=>setPage("games")}

      >

        ← Back to Games

      </button>







      <section className="game-detail-card">






        <div className="game-detail-status">

          {game.status?.detailedState}

        </div>






        <div className="game-detail-time">

          {gameTime}

        </div>








        <div className="matchup">



          <div className="detail-team">


            <img
              src={awayLogo}
              alt={awayTeam.name}
            />


            <h2>
              {awayTeam.name}
            </h2>


            <strong>
              {game.teams.away.score ?? "-"}
            </strong>


          </div>






          <div className="vs">

            VS

          </div>






          <div className="detail-team">


            <img
              src={homeLogo}
              alt={homeTeam.name}
            />


            <h2>
              {homeTeam.name}
            </h2>


            <strong>
              {game.teams.home.score ?? "-"}
            </strong>


          </div>


        </div>









        <div className="game-info">


          <h3>

            Game Information

          </h3>




          <div className="info-row">

            <span>
              Venue
            </span>


            <strong>
              {game.venue?.name ?? "Unknown"}
            </strong>


          </div>






          <div className="info-row">

            <span>
              Status
            </span>


            <strong>
              {game.status?.detailedState}
            </strong>


          </div>



        </div>









        {
          probablePitchers && (


            <div className="pitcher-section">


              <h3>

                Probable Pitchers

              </h3>




              <div className="pitcher-grid">



                <div className="pitcher-card">


                  <span>

                    {awayTeam.name}

                  </span>


                  <strong>

                    {
                      probablePitchers.away?.fullName
                      ??
                      "TBD"
                    }

                  </strong>


                </div>







                <div className="pitcher-card">


                  <span>

                    {homeTeam.name}

                  </span>


                  <strong>

                    {
                      probablePitchers.home?.fullName
                      ??
                      "TBD"
                    }

                  </strong>


                </div>



              </div>


            </div>


          )
        }









        <div className="live-section">

  <h3>Live Situation</h3>

  <div className="info-row">
    <span>Current Inning</span>
    <strong>{currentInning}</strong>
  </div>

  <div className="info-row">
    <span>Count</span>
    <strong>
      {balls}-{strikes}
    </strong>
  </div>

  <div className="info-row">
    <span>Outs</span>
    <strong>{outs}</strong>
  </div>

  <div className="info-row">
    <span>Current Batter</span>
    <strong>{batter}</strong>
  </div>

  <div className="info-row">
    <span>Current Pitcher</span>
    <strong>{pitcher}</strong>
  </div>

  <div className="base-container">

    <div
      className={
        first
          ? "base occupied"
          : "base"
      }
    >
      1B
    </div>

    <div
      className={
        second
          ? "base occupied"
          : "base"
      }
    >
      2B
    </div>

    <div
      className={
        third
          ? "base occupied"
          : "base"
      }
    >
      3B
    </div>

  </div>

</div>









        {
          innings.length > 0 && (


            <div className="scoreboard-section">


              <h3>

                Scoreboard

              </h3>





              <table className="scoreboard">


                <thead>

                  <tr>

                    <th></th>


                    {
                      innings.map((inning)=>(

                        <th key={inning.num}>

                          {inning.num}

                        </th>

                      ))

                    }


                    <th>
                      R
                    </th>


                    <th>
                      H
                    </th>


                    <th>
                      E
                    </th>


                  </tr>


                </thead>







                <tbody>


                  <tr>


                    <td>

                      {awayTeam.abbreviation}

                    </td>



                    {
                      innings.map((inning)=>(

                        <td key={inning.num}>

                          {inning.away?.runs ?? "-"}

                        </td>

                      ))

                    }




                    <td>

                      {game.teams.away.score ?? "-"}

                    </td>


                    <td>

                      {linescore?.teams?.away?.hits ?? "-"}

                    </td>


                    <td>

                      {linescore?.teams?.away?.errors ?? "-"}

                    </td>



                  </tr>








                  <tr>


                    <td>

                      {homeTeam.abbreviation}

                    </td>




                    {
                      innings.map((inning)=>(

                        <td key={inning.num}>

                          {inning.home?.runs ?? "-"}

                        </td>

                      ))

                    }





                    <td>

                      {game.teams.home.score ?? "-"}

                    </td>


                    <td>

                      {linescore?.teams?.home?.hits ?? "-"}

                    </td>


                    <td>

                      {linescore?.teams?.home?.errors ?? "-"}

                    </td>



                  </tr>


                </tbody>


              </table>



            </div>


          )
        }

        {
  awayBatting.length > 0 && (

    <div
  className="batting-section"
  style={{
  background: `linear-gradient(135deg, ${awayColor} 0%, ${awayColor}dd 45%, #0f172a 100%)`
}}
>

      <h3
  style={{
    color: "white"
  }}
>
  {awayTeam.name} Batters
</h3>

      <table className="batting-table">

        <thead>

          <tr>

            <th>Player</th>

            <th>AB</th>

            <th>R</th>

            <th>H</th>

            <th>RBI</th>

            <th>BB</th>

            <th>SO</th>

          </tr>

        </thead>

        <tbody>

          {

            awayBatting.map(player=>(

              <tr key={player.person.id}>

                <td>{player.person.fullName}</td>

                <td>{player.stats.batting.atBats ?? "-"}</td>

                <td>{player.stats.batting.runs ?? "-"}</td>

                <td>{player.stats.batting.hits ?? "-"}</td>

                <td>{player.stats.batting.rbi ?? "-"}</td>

                <td>{player.stats.batting.baseOnBalls ?? "-"}</td>

                <td>{player.stats.batting.strikeOuts ?? "-"}</td>

              </tr>

            ))

          }

        </tbody>

      </table>

    </div>

  )
}

{
  homeBatting.length > 0 && (

    <div
  className="batting-section"
  style={{
  background: `linear-gradient(135deg, ${homeColor} 0%, ${homeColor}dd 45%, #0f172a 100%)`
}}
>

      <h3
  style={{
    color: "white"
  }}
>
  {homeTeam.name} Batters
</h3>

      <table className="batting-table">

        <thead>

          <tr>

            <th>Player</th>

            <th>AB</th>

            <th>R</th>

            <th>H</th>

            <th>RBI</th>

            <th>BB</th>

            <th>SO</th>

          </tr>

        </thead>

        <tbody>

          {

            homeBatting.map(player=>(

              <tr key={player.person.id}>

                <td>{player.person.fullName}</td>

                <td>{player.stats.batting.atBats ?? "-"}</td>

                <td>{player.stats.batting.runs ?? "-"}</td>

                <td>{player.stats.batting.hits ?? "-"}</td>

                <td>{player.stats.batting.rbi ?? "-"}</td>

                <td>{player.stats.batting.baseOnBalls ?? "-"}</td>

                <td>{player.stats.batting.strikeOuts ?? "-"}</td>

              </tr>

            ))

          }

        </tbody>

      </table>

    </div>

  )
}
        





      </section>


    </main>


  );


}



export default GameDetail;