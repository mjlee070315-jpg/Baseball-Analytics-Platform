import { useState, useRef, useEffect } from "react";

import {
  searchPlayers,
  getPlayerDetails,
  getPlayerStats,
  getTodayGames,
  getPlayerGameLog,
} from "../services/mlbApi";

import SearchBar from "../components/SearchBar";
import PlayerCard from "../components/PlayerCard";
import PlayerProfile from "../components/PlayerProfile";
import StatsChart from "../components/StatsChart";
import PerformanceChart from "../components/PerformanceChart";
import CompareCard from "../components/CompareCard";
import GameCard from "../components/GameCard";

function Home() {

  const [search, setSearch] = useState("");
  const [players, setPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [stats, setStats] = useState(null);
  const [gameLog, setGameLog] = useState([]);
  const [games, setGames] = useState([]);

  const [compareSearch, setCompareSearch] = useState("");
  const [comparePlayer, setComparePlayer] = useState(null);
  const [compareStats, setCompareStats] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const profileRef = useRef();

  useEffect(() => {

    const loadGames = async () => {

      const result = await getTodayGames();

      setGames(result);

    };

    loadGames();

  }, []);

  const handleSearch = async () => {

    if (search.trim() === "") return;

    setLoading(true);
    setError("");

    try {

      const result = await searchPlayers(search);

      if (result.length === 0) {

        setPlayers([]);
        setError("No player found. Try another name.");

      } else {

        setPlayers(result);

      }

    } catch {

      setError("Something went wrong. Please try again.");

    }

    setLoading(false);

  };

  const handlePlayerClick = async (id) => {

    const player = await getPlayerDetails(id);

    setSelectedPlayer(player);

    const playerStats = await getPlayerStats(id);

    setStats(playerStats);

    const log = await getPlayerGameLog(id);

    setGameLog(log);

    setTimeout(() => {

      profileRef.current?.scrollIntoView({

        behavior: "smooth",
        block: "start",

      });

    }, 300);

  };

  const handleCompareSearch = async () => {

    if (compareSearch.trim() === "") return;

    const result = await searchPlayers(compareSearch);

    if (result.length > 0) {

      const player = await getPlayerDetails(result[0].id);

      const playerStats = await getPlayerStats(result[0].id);

      setComparePlayer(player);

      setCompareStats(playerStats);

    }

  };

  return (

    <>

      <section className="hero">

        <h1>

          MLB Analytics Platform

        </h1>

        <p>

          Search MLB Players and Analyze Real Statistics

        </p>

        <SearchBar
          search={search}
          setSearch={setSearch}
          onSearch={handleSearch}
        />

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

        {players.length > 0 && (

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

              {players.map((player) => (

                <PlayerCard

                  key={player.id}

                  player={player}

                  onClick={handlePlayerClick}

                />

              ))}

            </div>

          </section>

        )}
                {selectedPlayer && (

          <div ref={profileRef}>

            <PlayerProfile
  player={selectedPlayer}
  stats={stats}
  currentSeason={2026}
/>

          </div>

        )}

        {selectedPlayer && (

          <section className="compare-section">

            <div className="section-header">

              <span></span>

              <div>

                <h2>

                  Compare Player

                </h2>

                <p>

                  Compare another MLB player with the selected player

                </p>

              </div>

            </div>

            <div className="search-container">

              <input

                className="search"

                placeholder="Search player to compare..."

                value={compareSearch}

                onChange={(e) =>
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

        )}

        {stats && (

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

            {comparePlayer && compareStats && (

              <CompareCard

                player1={selectedPlayer}

                player2={comparePlayer}

                stats1={stats}

                stats2={compareStats}

              />

            )}

          </section>

        )}
                <section className="games-section">

          <div className="section-header">

            <span></span>

            <div>

              <h2>

                Today's Games

              </h2>

              <p>

                Live MLB Matchups & Schedule

              </p>

            </div>

          </div>

          <div className="games-grid">
  {games.length > 0 ? (
    games.map((game) => (
      <GameCard
        key={game.gamePk}
        game={game}
      />
    ))
  ) : (
    <p>No games scheduled today.</p>
  )}
</div>

        </section>

      </main>

    </>

  );

}

export default Home;