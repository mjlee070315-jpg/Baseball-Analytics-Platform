import { useEffect, useState } from "react";

import {
  getStandings
} from "../services/mlbApi";

import TeamCard from "../components/TeamCard";



function Standings({ setSelectedTeamId, setPage }) {


  const [standings, setStandings] = useState([]);

  const [league, setLeague] = useState("ALL");




  useEffect(()=>{


    async function loadStandings(){


      const data = await getStandings();


      setStandings(data);


    }


    loadStandings();


  },[]);






  function handleTeamClick(teamId){

  console.log("SELECTED TEAM ID:", teamId);

  setSelectedTeamId(teamId);

  console.log("CHANGING PAGE TO TEAM DETAIL");

  setPage("teamDetail");

}







const filteredTeams = standings.filter((team)=>{


  if(league === "ALL") return true;


  if(league === "AL") {

    return team.division.includes("American");

  }


  if(league === "NL") {

    return team.division.includes("National");

  }


});

  const divisions = filteredTeams.reduce((acc,team)=>{


    if(!acc[team.division]){


      acc[team.division] = [];


    }



    acc[team.division].push(team);



    return acc;



  },{});









  return(


    <div className="standings-page">



      <h1>

        MLB Standings

      </h1>







      <div className="league-buttons">


  <button

  className={league==="AL" ? "active" : ""}

  onClick={()=>setLeague("AL")}

>
  American League
</button>




  <button

    onClick={()=>setLeague("NL")}

  >

    National League

  </button>


</div>









      {
        Object.keys(divisions).map((division)=>(


          <div

            className="division-card"

            key={division}

          >



            <h2>

              {division}

            </h2>







            {
              divisions[division].map((team,index)=>(


                <TeamCard


                  key={team.teamId}


                  team={team}


                  index={index}


                  onClick={handleTeamClick}


                />


              ))
            }




          </div>


        ))
      }






    </div>


  )


}



export default Standings;