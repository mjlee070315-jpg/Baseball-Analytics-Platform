import { useEffect, useState } from "react";

import { getStandings } from "../services/mlbApi";


function Standings(){


  const [standings, setStandings] = useState([]);




  useEffect(()=>{


    async function loadStandings(){


      const data = await getStandings();


      setStandings(data);


    }


    loadStandings();


  },[]);







  const divisions = standings.reduce((acc, team)=>{


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


        <button>

          American League

        </button>



        <button>

          National League

        </button>


      </div>







      {Object.keys(divisions).map((division)=>(


        <div

          className="division-card"

          key={division}

        >



          <h2>

            {division}

          </h2>







          {divisions[division].map((team,index)=>(


            <div

              className="team-row"

              key={team.team}


            >





              <div className="team-info">



                <img

src={team.logo}

alt={team.team}

/>




                <span>

                  {index + 1}. {team.team}

                </span>



              </div>







              <div className="team-record">



                {team.wins} - {team.losses}



                <small>

                  {" "}

                  ({team.winPercentage})

                </small>



              </div>





            </div>



          ))}



        </div>



      ))}




    </div>


  )


}



export default Standings;