function GameCard({ game, onClick }) {


  // 데이터 보호
  if (!game || !game.teams) {

    return null;

  }



  const awayTeam = game.teams.away?.team;

  const homeTeam = game.teams.home?.team;



  if (!awayTeam || !homeTeam) {

    return null;

  }





  const awayLogo =
    `https://www.mlbstatic.com/team-logos/${awayTeam.id}.svg`;


  const homeLogo =
    `https://www.mlbstatic.com/team-logos/${homeTeam.id}.svg`;





  const gameTime =
  new Intl.DateTimeFormat("en-US", {

    month:"short",

    day:"numeric",

    year:"numeric",

    hour:"numeric",

    minute:"2-digit",

    hour12:true

  }).format(
    new Date(game.gameDate)
  );







  const handleClick = () => {


    console.log(
      "GAME CARD CLICKED:",
      game
    );


    if (onClick) {

      onClick(game);

    }


  };







  return (


    <div

      className="game-card"

      onClick={handleClick}

      style={{

        cursor: onClick ? "pointer" : "default"

      }}

    >





      <div className="game-status">


        {game.status?.detailedState ?? "Scheduled"}


      </div>






      <div className="game-time">


        {gameTime}


      </div>








      <div className="game-team">


        <img

          src={awayLogo}

          alt={awayTeam.name}

        />



        <span>

          {awayTeam.name}

        </span>



        <strong>

          {game.teams.away.score ?? "-"}

        </strong>



      </div>








      <div className="game-team">


        <img

          src={homeLogo}

          alt={homeTeam.name}

        />



        <span>

          {homeTeam.name}

        </span>



        <strong>

          {game.teams.home.score ?? "-"}

        </strong>



      </div>





    </div>


  );


}



export default GameCard;