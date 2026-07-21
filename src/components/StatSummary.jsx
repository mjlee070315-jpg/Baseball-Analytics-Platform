function StatSummary({stats}){


if(!stats) return null;


return (

<div className="stat-summary">


<div>
<span>AVG</span>
<strong>{stats.avg}</strong>
</div>


<div>
<span>OPS</span>
<strong>{stats.ops}</strong>
</div>


<div>
<span>HR</span>
<strong>{stats.homeRuns}</strong>
</div>


<div>
<span>RBI</span>
<strong>{stats.rbi}</strong>
</div>



<div>
<span>ERA</span>
<strong>{stats.era}</strong>
</div>


<div>
<span>W</span>
<strong>{stats.wins}</strong>
</div>


<div>
<span>K</span>
<strong>{stats.strikeouts}</strong>
</div>


<div>
<span>WHIP</span>
<strong>{stats.whip}</strong>
</div>


</div>


);


}


export default StatSummary;