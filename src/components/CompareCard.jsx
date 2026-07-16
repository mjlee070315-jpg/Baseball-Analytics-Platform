function CompareCard({player1, player2, stats1, stats2}) {


  return (

    <div className="compare-card">


      <h2>

        Player Comparison

      </h2>



      <div className="compare-grid">


        <div>


          <h3>

            {player1.fullName}

          </h3>


          <p>
            AVG: {stats1.avg}
          </p>


          <p>
            HR: {stats1.homeRuns}
          </p>


          <p>
            OPS: {stats1.ops}
          </p>


          <p>
            RBI: {stats1.rbi}
          </p>


        </div>





        <div className="vs">

          VS

        </div>





        <div>


          <h3>

            {player2.fullName}

          </h3>


          <p>
            AVG: {stats2.avg}
          </p>


          <p>
            HR: {stats2.homeRuns}
          </p>


          <p>
            OPS: {stats2.ops}
          </p>


          <p>
            RBI: {stats2.rbi}
          </p>


        </div>



      </div>


    </div>

  );


}


export default CompareCard;