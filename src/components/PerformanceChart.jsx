import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";


function PerformanceChart({ gameLog }) {


  if (!gameLog || gameLog.length === 0) {

    return null;

  }



  const data = gameLog.map((game, index)=>({


    game:

    index + 1,


    OPS:

    game.ops,


    AVG:

    game.avg



  }));






  return (


    <div className="chart-card">



      <div className="chart-header">


        <h2>

          Season Performance Trend

        </h2>



        <p>

          OPS & AVG progression

        </p>



      </div>





      <ResponsiveContainer

        width="100%"

        height={350}

      >



        <LineChart

          data={data}

          margin={{

            top:20,

            right:30,

            left:10,

            bottom:10

          }}

        >





          <CartesianGrid

            strokeDasharray="4 4"

          />






          <XAxis

            dataKey="game"

            label={{

              value:"Games",

              position:"insideBottom",

              offset:-5

            }}

          />






          <YAxis

            domain={[0,1]}

          />






          <Tooltip

            formatter={(value)=>value.toFixed(3)}

          />






          <Legend />







          <Line


            type="monotone"


            dataKey="OPS"


            stroke="#2563eb"


            strokeWidth={4}


            dot={{r:5}}


            activeDot={{r:8}}


          />







          <Line


            type="monotone"


            dataKey="AVG"


            stroke="#ef4444"


            strokeWidth={4}


            dot={{r:5}}


            activeDot={{r:8}}


          />






        </LineChart>



      </ResponsiveContainer>



    </div>


  );


}


export default PerformanceChart;