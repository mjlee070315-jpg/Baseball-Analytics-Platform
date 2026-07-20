function GameCard({ game }) {
  return (
    <div className="game-card">
      <div className="team-row">
        <span>{game.teams.away.team.name}</span>
        <strong>{game.teams.away.score ?? "-"}</strong>
      </div>

      <div className="team-row">
        <span>{game.teams.home.team.name}</span>
        <strong>{game.teams.home.score ?? "-"}</strong>
      </div>

      <div className="game-status">
        {game.status.detailedState}
      </div>
    </div>
  );
}

export default GameCard;