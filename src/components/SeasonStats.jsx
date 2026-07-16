function SeasonStats({ stats, currentSeason }) {

  if (!stats) {

    return (

      <div className="season-stats">

        <h3>
          {currentSeason} Season Statistics
        </h3>

        <p className="no-stats">
          No season statistics available.
        </p>

      </div>

    );

  }

  const statList = [

    {
      label: "AVG",
      value: stats.avg || "--",
    },

    {
      label: "HR",
      value: stats.homeRuns || "--",
    },

    {
      label: "RBI",
      value: stats.rbi || "--",
    },

    {
      label: "OPS",
      value: stats.ops || "--",
    },

    {
      label: "Hits",
      value: stats.hits || "--",
    },

    {
      label: "AB",
      value: stats.atBats || "--",
    },

    {
      label: "BB",
      value: stats.baseOnBalls || "--",
    },

    {
      label: "SO",
      value: stats.strikeOuts || "--",
    },

  ];

  return (

    <div className="season-stats">

      <h3>

        {currentSeason} Season Statistics

      </h3>

      <div className="stats-grid">

        {

          statList.map((stat) => (

            <div
              key={stat.label}
              className="stat-card"
            >

              <span className="stat-label">

                {stat.label}

              </span>

              <h2 className="stat-value">

                {stat.value}

              </h2>

            </div>

          ))

        }

      </div>

    </div>

  );

}

export default SeasonStats;