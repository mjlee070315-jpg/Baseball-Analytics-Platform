import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";


function StatsChart({ stats }) {


  const data = [

    {
      name: "AVG",
      value: Number(stats.avg) || 0
    },

    {
      name: "OPS",
      value: Number(stats.ops) || 0
    },

    {
      name: "HR",
      value: Number(stats.homeRuns) || 0
    },

    {
      name: "RBI",
      value: Number(stats.rbi) || 0
    }

  ];



  return (

    <div className="chart-card">


      <h2>

        Player Performance

      </h2>



      <ResponsiveContainer

        width="100%"

        height={300}

      >


        <LineChart data={data}>


          <CartesianGrid strokeDasharray="3 3" />


          <XAxis dataKey="name" />


          <YAxis />


          <Tooltip />



          <Line

            type="monotone"

            dataKey="value"

            stroke="#2563eb"

            strokeWidth={3}

          />



        </LineChart>



      </ResponsiveContainer>



    </div>

  );


}


export default StatsChart;