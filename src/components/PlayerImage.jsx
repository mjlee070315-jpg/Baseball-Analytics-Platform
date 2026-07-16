function PlayerImage({ player }) {

  if (!player) return null;

  return (

    <img
      className="player-image"
      src={`https://img.mlbstatic.com/mlb-photos/image/upload/w_213,q_auto:best/v1/people/${player.id}/action/vertical/current`}
      alt={player.fullName}
    />

  );

}

export default PlayerImage;