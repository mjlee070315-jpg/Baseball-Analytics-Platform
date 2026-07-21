function PlayerCard({ player, onClick }) {


const imageUrl =

player.image ||

`https://img.mlbstatic.com/mlb-photos/image/upload/w_213,q_auto:best/v1/people/${player.id}/action/vertical/current`;



return (

<div

className="player-card"

onClick={()=>onClick(player)}

>



<img

className="player-card-image"

src={imageUrl}

alt={player.fullName}

onError={(e)=>{

e.target.src =
"https://via.placeholder.com/300";

}}

/>




<div className="player-card-info">


<h3>

{player.fullName}

</h3>


<p>

{player.primaryPosition?.name || "MLB Player"}

</p>



{
player.currentTeam && (

<span className="team-name">

{player.currentTeam.name}

</span>

)

}



</div>






{
player.stats && (

<div className="mini-stats">


<div>

<span>AVG</span>

<strong>
{player.stats.avg || "-"}
</strong>

</div>



<div>

<span>OPS</span>

<strong>
{player.stats.ops || "-"}
</strong>

</div>



<div>

<span>HR</span>

<strong>
{player.stats.homeRuns || "-"}
</strong>

</div>


</div>

)

}





<button

className="view-button"

onClick={(e)=>{

e.stopPropagation();

onClick(player);

}}

>

View Analytics →

</button>



</div>

);


}


export default PlayerCard;