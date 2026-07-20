import { useEffect, useState, useRef } from "react";

import teamColors from "../utils/teamColors";

import {
  getTeamDetails,
  getTeamRoster,
  getTeamStats,
  getPlayerDetails,
  getPlayerStats
} from "../services/mlbApi";



function TeamDetail({ teamId }) {


  const [team, setTeam] = useState(null);

  const [roster, setRoster] = useState([]);

  const [stats, setStats] = useState(null);


  const [selectedRosterPlayer, setSelectedRosterPlayer] = useState(null);

  const [playerStats, setPlayerStats] = useState(null);

  const playerProfileRef = useRef(null);






  useEffect(() => {


    async function loadTeam() {


      if(!teamId) return;



      const teamData = await getTeamDetails(teamId);

      const rosterData = await getTeamRoster(teamId);

      const statsData = await getTeamStats(teamId);



      console.log("TEAM DETAIL:", teamData);

      console.log("ROSTER:", rosterData);

      console.log("TEAM STATS:", statsData);



      setTeam(teamData);

      setRoster(rosterData);

      setStats(statsData);


    }



    loadTeam();


  },[teamId]);








  const handlePlayerClick = async(player)=>{


    console.log(
      "CLICK PLAYER:",
      player.person.fullName
    );


    const playerData = await getPlayerDetails(
      player.person.id
    );


    const statsData = await getPlayerStats(
      player.person.id
    );


    console.log(
      "PLAYER DATA:",
      playerData
    );


    console.log(
      "PLAYER STATS:",
      statsData
    );



    setSelectedRosterPlayer(playerData);

    setPlayerStats(statsData);
    setTimeout(()=>{

  playerProfileRef.current?.scrollIntoView({

    behavior:"smooth",

    block:"center"

  });

},200);



  };









  if(!team){


    return (

      <div className="loading">

        Loading Team...

      </div>

    );

  }







  const colors = teamColors[team.id] || {

    primary:"#0b1f3a",

    secondary:"#2563eb"

  };







  return (



    <div

      className="team-detail-page"

      style={{

        "--team-primary": colors.primary,

        "--team-secondary": colors.secondary

      }}

    >









      <div className="team-header">



        <img

          src={`https://www.mlbstatic.com/team-logos/${team.id}.svg`}

          alt={team.name}

          className="team-detail-logo"

        />



        <div>


          <h1>

            {team.name}

          </h1>


          <p>

            {team.league?.name}

          </p>


          <p>

            {team.division?.name}

          </p>


        </div>



      </div>









      <div className="team-performance-card">


        <h2>

          Team Performance

        </h2>




        <div className="team-stats-grid">



          <div className="team-stat-box">

            <span>Wins</span>

            <strong>
              {stats?.wins ?? "-"}
            </strong>

          </div>




          <div className="team-stat-box">

            <span>Losses</span>

            <strong>
              {stats?.losses ?? "-"}
            </strong>

          </div>




          <div className="team-stat-box">

            <span>Winning %</span>

            <strong>
              {stats?.winPercentage ?? "-"}
            </strong>

          </div>




          <div className="team-stat-box">

            <span>Runs</span>

            <strong>
              {stats?.runs ?? "-"}
            </strong>

          </div>




          <div className="team-stat-box">

            <span>Home Runs</span>

            <strong>
              {stats?.homeRuns ?? "-"}
            </strong>

          </div>




          <div className="team-stat-box">

            <span>AVG</span>

            <strong>
              {stats?.avg ?? "-"}
            </strong>

          </div>




          <div className="team-stat-box">

            <span>OPS</span>

            <strong>
              {stats?.ops ?? "-"}
            </strong>

          </div>




          <div className="team-stat-box">

            <span>ERA</span>

            <strong>
              {stats?.era ?? "-"}
            </strong>

          </div>



        </div>


      </div>









      {
        selectedRosterPlayer && (


          <div

  ref={playerProfileRef}

  className="mini-player-profile"

>



            <img

              src={selectedRosterPlayer.image}

              alt={selectedRosterPlayer.fullName}

              className="mini-player-image"

            />



            <div>


              <h2>

  {
    selectedRosterPlayer.primaryNumber &&
    `#${selectedRosterPlayer.primaryNumber} `
  }

  {selectedRosterPlayer.fullName}

</h2>



              <p>

                Position:

                {" "}

                {selectedRosterPlayer.primaryPosition?.name}

              </p>



              {
selectedRosterPlayer.primaryPosition?.name === "Pitcher" ||
selectedRosterPlayer.primaryPosition?.abbreviation === "P" ? (

  <>
    <p>
      ERA: {playerStats?.era ?? "-"}
    </p>

    <p>
      Strikeouts: {playerStats?.pitchingStrikeOuts ?? "-"}
    </p>
  </>

) : (

  <>
    <p>
      AVG: {playerStats?.avg ?? "-"}
    </p>

    <p>
      OPS: {playerStats?.ops ?? "-"}
    </p>
  </>

)
}



            </div>



          </div>


        )
      }









      <h2 className="roster-title">

        Roster

      </h2>






      <div className="roster-grid">



        {
  roster.map((player)=>(

    <div

      key={player.person.id}

      className="roster-card"


      onClick={()=>handlePlayerClick(player)}


    >



      <img

        src={
          `https://img.mlbstatic.com/mlb-photos/image/upload/w_150,q_auto:best/v1/people/${player.person.id}/action/vertical/current`
        }

        alt={player.person.fullName}

        className="roster-player-image"

      />




      <div className="roster-player-info">


        <h3>

          {
            player.jerseyNumber &&
            `#${player.jerseyNumber} `
          }

          {player.person.fullName}

        </h3>



        <span>

          {player.position?.name}

        </span>


      </div>



    </div>


  ))
}



      </div>






    </div>


  );


}



export default TeamDetail;