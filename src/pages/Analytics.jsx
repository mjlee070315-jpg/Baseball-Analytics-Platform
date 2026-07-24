import StatsChart from "../components/StatsChart";
import PerformanceChart from "../components/PerformanceChart";
import StatSummary from "../components/StatSummary";

import "../styles/analytics.css";

function Analytics({

  selectedPlayer,

  stats,

  gameLog,

  setPage

}) {


  return (

    <main className="container analytics-page">


      <section className="analytics-section">


        <button

          className="back-button"

          onClick={()=>setPage("home")}

        >

          ← Back to Players

        </button>





        <div className="section-header">


          <span></span>


          <div>

            <h2>
              MLB Analytics Dashboard
            </h2>


            <p>
              Advanced player performance analysis
            </p>


          </div>


        </div>







        {
          selectedPlayer && (

            <div className="analytics-profile">


<img

className="analytics-player-image"

src={selectedPlayer.image}

alt={selectedPlayer.fullName}

/>



<div className="analytics-player-info">


<h1>
{selectedPlayer.fullName}
</h1>


<p>
{selectedPlayer.currentTeam?.name || "MLB"}
</p>


<div className="player-tags">


<span>
{selectedPlayer.primaryPosition?.name || "Player"}
</span>


<span>
MLB Analytics
</span>


</div>


</div>



</div>

          )

        }








        {
          stats ? (

            <>


              <StatSummary

                stats={stats}

              />




              <div className="chart-wrapper">


                <StatsChart

                  stats={stats}

                />


              </div>





              {
                gameLog?.length > 0 && (

                  <div className="chart-wrapper">


                    <PerformanceChart

                      gameLog={gameLog}

                    />


                  </div>

                )
              }



            </>


          ) : (


            <div className="empty-page">


              <h2>

                Select a player

              </h2>


              <p>

                Player statistics will appear here.

              </p>


            </div>


          )
        }




      </section>


    </main>

  );

}


export default Analytics;