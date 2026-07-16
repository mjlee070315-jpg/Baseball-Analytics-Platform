function PlayerCard({player,onClick}) {


  return (


    <div

      className="player-card"

      onClick={()=>onClick(player.id)}

    >



      <h3>

        {player.fullName}

      </h3>



      <p className="position">

        {player.primaryPosition?.name || "MLB Player"}

      </p>





      <div className="player-info">


        <p>

          Birth

        </p>


        <span>

          {player.birthDate || "-"}

        </span>


      </div>






      <button

        className="view-button"

      >

        View Analytics →

      </button>





    </div>


  );


}


export default PlayerCard;