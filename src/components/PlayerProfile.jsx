import PlayerImage from "./PlayerImage";
import PlayerBio from "./PlayerBio";
import SeasonStats from "./SeasonStats";

function PlayerProfile({
  player,
  stats,
  currentSeason,
}) {

  if (!player) return null;

  return (

    <section
      id="profile"
      className="profile-card"
    >

      <div className="profile-left">

        <PlayerImage
          player={player}
        />

      </div>

      <div className="profile-right">

        <PlayerBio
          player={player}
        />

        <SeasonStats
          stats={stats}
          currentSeason={currentSeason}
        />

      </div>

    </section>

  );

}

export default PlayerProfile;