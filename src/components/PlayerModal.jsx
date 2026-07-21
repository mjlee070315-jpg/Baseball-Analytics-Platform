function PlayerModal({

  player,

  onClose,

  setPage

}) {


return (

<div

className="modal-overlay"

onClick={onClose}

>


<div

className="player-modal"

onClick={(e)=>e.stopPropagation()}

>


<button

className="modal-analysis"

onClick={()=>{

  onClose();

  setPage("analytics");

}}

>
View Full Analytics →
</button>



<img

className="modal-image"

src={

player.headshot ||

`https://img.mlbstatic.com/mlb-photos/image/upload/w_213,q_auto:best/v1/people/${player.id}/action/vertical/current`

}

/>



<div className="modal-info">


<h2>

{player.fullName}

</h2>



<p>

{player.currentTeam?.name || "MLB"}

</p>



<p>

{player.primaryPosition?.name}

</p>



{
player.stats && (

<div className="modal-stats">


<div>

AVG

<strong>

{player.stats.avg || "-"}

</strong>

</div>


<div>

OPS

<strong>

{player.stats.ops || "-"}

</strong>

</div>


<div>

HR

<strong>

{player.stats.homeRuns || "-"}

</strong>

</div>


</div>

)

}



<button

className="modal-analysis"

onClick={()=>{

onClose();

}}

>

View Full Analytics →

</button>



</div>


</div>


</div>


)

}


export default PlayerModal;