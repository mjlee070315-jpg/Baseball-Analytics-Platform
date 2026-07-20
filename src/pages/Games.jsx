import { useEffect, useState } from "react";
import { getTodayGames } from "../services/mlbApi";
import GameCard from "../components/GameCard";

function Games() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadGames = async () => {
      try {
        const result = await getTodayGames();
        setGames(result);
      } catch (error) {
        console.error("Failed to load games:", error);
      } finally {
        setLoading(false);
      }
    };

    loadGames();
  }, []);

  return (
    <main className="container">
      <section className="games-section">
        <div className="section-header">
          <span></span>

          <div>
            <h2>Today's Games</h2>
            <p>Live MLB Schedule & Scores</p>
          </div>
        </div>

        {loading ? (
          <p>Loading today's games...</p>
        ) : games.length > 0 ? (
          <div className="games-grid">
            {games.map((game) => (
              <GameCard
                key={game.gamePk}
                game={game}
              />
            ))}
          </div>
        ) : (
          <p>No games scheduled today.</p>
        )}
      </section>
    </main>
  );
}

export default Games;