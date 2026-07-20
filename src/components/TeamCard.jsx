import teamColors from "../utils/teamColors";


function TeamCard({ team, index, onClick }) {


  const isLeader = index === 0;


  const colors = teamColors[team.teamId] || {

    primary:"#0b1f3a",

    secondary:"#2563eb"

  };



  return (

    <div

  className={`team-card ${isLeader ? "division-leader" : ""}`}


      onClick={()=>onClick(team.teamId)}

      style={{

        "--team-primary": colors.primary,

        "--team-secondary": colors.secondary

      }}

    >



      <div className="team-card-left">


        <img

          src={team.logo}

          alt={team.team}

          className="team-logo"

        />



        <div className="team-card-info">


          <h3>

            {index + 1}. {team.team}

          </h3>



          <p>

            {team.division}

          </p>


        </div>


      </div>





      <div className="team-card-record">


        <div>

          <span>
            Record
          </span>


          <strong>

            {team.wins} - {team.losses}

          </strong>


        </div>



        <div>

          <span>
            Win %
          </span>


          <strong>

            {team.winPercentage}

          </strong>


        </div>



        <div>

          <span>
            GB
          </span>


          <strong>

            {team.gamesBack ?? "-"}

          </strong>


        </div>



      </div>



    </div>

  );


}


export default TeamCard;