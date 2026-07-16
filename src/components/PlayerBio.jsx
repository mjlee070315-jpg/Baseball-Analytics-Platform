function PlayerBio({ player }) {

  if (!player) return null;

  return (

    <div className="player-bio">

      <p className="player-team">

        {player.currentTeam?.name || "MLB"}

      </p>

      <h1 className="player-name">

        {player.fullName}

      </h1>

      <span className="player-position">

        {player.primaryPosition?.name || "Unknown Position"}

      </span>

      <div className="bio-grid">

        <div className="bio-box">

          <h4>Height</h4>

          <p>{player.height || "N/A"}</p>

        </div>

        <div className="bio-box">

          <h4>Weight</h4>

          <p>{player.weight || "N/A"} lbs</p>

        </div>

        <div className="bio-box">

          <h4>Bats</h4>

          <p>{player.batSide?.description || "N/A"}</p>

        </div>

        <div className="bio-box">

          <h4>Throws</h4>

          <p>{player.pitchHand?.description || "N/A"}</p>

        </div>

      </div>

    </div>

  );

}

export default PlayerBio;