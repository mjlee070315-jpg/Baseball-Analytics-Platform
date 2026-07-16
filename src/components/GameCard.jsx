function GameCard({ title, date }) {



  return (



    <div className="game-card">





      <h3>


        {title}


      </h3>





      <p>


        MLB Regular Season Game


      </p>






      <span className="game-date">


        {date}


      </span>





    </div>



  );



}



export default GameCard;