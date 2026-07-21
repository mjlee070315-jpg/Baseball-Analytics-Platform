import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";


function StatsChart({stats}){


if(!stats) return null;



const isPitcher =
stats.era !== "-";



const data = isPitcher

? [

{
name:"ERA",
value:Number(stats.era)
},

{
name:"WHIP",
value:Number(stats.whip)
},

{
name:"W",
value:Number(stats.wins)
},

{
name:"K",
value:Number(stats.strikeouts)
}

]

:

[

{
name:"AVG",
value:Number(stats.avg)
},

{
name:"OPS",
value:Number(stats.ops)
},

{
name:"HR",
value:Number(stats.homeRuns)
},

{
name:"RBI",
value:Number(stats.rbi)
}

];





return (

<div className="chart-card">


<h2>

{
isPitcher

?
"Pitching Statistics"

:
"Hitting Statistics"

}

</h2>



<ResponsiveContainer

width="100%"

height={350}

>


<BarChart data={data}>


<XAxis

dataKey="name"

/>


<YAxis />


<Tooltip />


<Bar

dataKey="value"

radius={[8,8,0,0]}

/>


</BarChart>


</ResponsiveContainer>



</div>

);


}


export default StatsChart;