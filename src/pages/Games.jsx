import { useEffect, useState } from "react";

import { getTodayGames } from "../services/mlbApi";

import GameCard from "../components/GameCard";

function Games() {

  const [games, setGames] = useState([]);

  useEffect(() => {

    const loadGames = async () => {

      const result = await getTodayGames();

      setGames(result);

    };

    loadGames();

  }, []);

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

              Live MLB Schedule

            </p>

          </div>

        </div>

        <div className="game-grid">

          {games.length > 0 ? (

            games.map((game) => (

              <GameCard

                key={game.id}

                title={`${game.awayTeam} vs ${game.homeTeam}`}

                date={game.status}

              />

            ))

          ) : (

            <p>

              No games scheduled today.

            </p>

          )}

        </div>

      </section>

    </main>

  );

}

export default Games;