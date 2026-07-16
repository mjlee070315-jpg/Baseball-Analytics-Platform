import StatsChart from "../components/StatsChart";
import PerformanceChart from "../components/PerformanceChart";

function Analytics({

  stats,

  gameLog,

}) {

  return (

    <main className="container">

      <section className="analytics-section">

        <div className="section-header">

          <span></span>

          <div>

            <h2>

              MLB Analytics Dashboard

            </h2>

            <p>

              Visualize player performance using MLB Stats API

            </p>

          </div>

        </div>

        {stats ? (

          <>

            <StatsChart

              stats={stats}

            />

            <PerformanceChart

              gameLog={gameLog}

            />

          </>

        ) : (

          <div className="empty-page">

            <h2>

              Search a player first

            </h2>

            <p>

              Analytics will appear here after selecting a player.

            </p>

          </div>

        )}

      </section>

    </main>

  );

}

export default Analytics;