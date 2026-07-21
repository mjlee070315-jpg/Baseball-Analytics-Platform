import { useEffect, useState } from "react";

import {
  getTodayGames
} from "../services/mlbApi";

import GameCard from "../components/GameCard";



function Games({

  setSelectedGame,

  setPage

}) {



  const [games, setGames] = useState([]);

  const [loading, setLoading] = useState(true);





  useEffect(() => {


    const loadGames = async () => {


      try {


        const result = await getTodayGames();


        console.log(
          "TODAY GAMES:",
          result
        );


        setGames(result);



      } catch(error) {


        console.error(
          "Failed to load games:",
          error
        );


      } finally {


        setLoading(false);


      }


    };



    loadGames();



  }, []);








  const handleGameClick = (game) => {


    console.log(
      "HANDLE GAME CLICK:",
      game
    );



    if(setSelectedGame){

      setSelectedGame(game);

    }



    if(setPage){

      setPage("gameDetail");

    }


  };









  return (


    <main className="container">


      <section className="games-section">



        <div className="section-header">


          <span></span>



          <div>


            <h2>

              Today's Games

            </h2>



            <p>

              Live MLB Schedule & Scores

            </p>


          </div>


        </div>








        {
          loading ? (


            <p>

              Loading today's games...

            </p>



          ) : games.length > 0 ? (



            <div className="games-grid">



              {
                games.map((game)=>(


                  <GameCard


                    key={game.gamePk}


                    game={game}


                    onClick={()=>{

                      handleGameClick(game);

                    }}


                  />


                ))
              }



            </div>




          ) : (


            <p>

              No games scheduled today.

            </p>


          )
        }






      </section>


    </main>


  );


}



export default Games;