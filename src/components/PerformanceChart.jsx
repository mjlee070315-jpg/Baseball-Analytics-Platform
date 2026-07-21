import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";


function PerformanceChart({ gameLog }) {


  if (!gameLog || gameLog.length === 0) {

    return (

      <div className="chart-card">

        <h2>
          Recent Performance
        </h2>

        <p>
          No game log available
        </p>

      </div>

    );

  }



  const data = gameLog
    .slice(0,10)
    .reverse()
    .map((game,index)=>({

      name:
      game.date
      ? game.date.slice(5)
      : `Game ${index+1}`,

      AVG:
      Number(game.avg) || 0,

      OPS:
      Number(game.ops) || 0,

      HR:
      Number(game.homeRuns) || 0

    }));




  return (

    <div className="chart-card">


      <h2>
        Recent Performance
      </h2>


      <p>
        Last 10 games performance trend
      </p>




      <ResponsiveContainer

        width="100%"

        height={350}

      >


        <LineChart

          data={data}

        >


          <CartesianGrid

            strokeDasharray="3 3"

          />


          <XAxis

            dataKey="name"

          />


          <YAxis />


          <Tooltip />



          <Line

            type="monotone"

            dataKey="AVG"

            strokeWidth={3}

          />



          <Line

            type="monotone"

            dataKey="OPS"

            strokeWidth={3}

          />



        </LineChart>


      </ResponsiveContainer>



    </div>

  );


}


export default PerformanceChart;