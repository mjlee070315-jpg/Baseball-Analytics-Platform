const BASE_URL = "https://statsapi.mlb.com/api/v1";



/* =========================
   SEARCH PLAYER
========================= */

export async function searchPlayers(name) {


  try {


    const response = await fetch(

      `${BASE_URL}/people/search?names=${name}`

    );


    const data = await response.json();


    return data.people || [];



  } catch(error) {


    console.error(
      "Search Error:",
      error
    );


    return [];

  }


}





/* =========================
   PLAYER DETAILS
========================= */

export async function getPlayerDetails(id) {


  try {


    const response = await fetch(

      `${BASE_URL}/people/${id}`

    );



    const data = await response.json();



    const player = data.people?.[0];



    if(!player) return null;



    return {


      ...player,



      image:

      `https://img.mlbstatic.com/mlb-photos/image/upload/w_640,q_auto:best/v1/people/${id}/action/vertical/current`



    };



  } catch(error) {


    console.error(

      "Player Detail Error:",

      error

    );


    return null;


  }


}







/* =========================
   PLAYER STATS
========================= */


export async function getPlayerStats(id) {
  try {
    const season = new Date().getFullYear();

    const hittingResponse = await fetch(
      `${BASE_URL}/people/${id}/stats?stats=season&group=hitting&season=${season}`
    );

    const pitchingResponse = await fetch(
      `${BASE_URL}/people/${id}/stats?stats=season&group=pitching&season=${season}`
    );

    const hittingData = await hittingResponse.json();
    const pitchingData = await pitchingResponse.json();

    const hitting =
      hittingData.stats?.[0]?.splits?.[0]?.stat || {};

    const pitching =
      pitchingData.stats?.[0]?.splits?.[0]?.stat || {};

    return {
      // Hitting
      avg: hitting.avg || "-",
      homeRuns: hitting.homeRuns || "-",
      rbi: hitting.rbi || "-",
      ops: hitting.ops || "-",
      hits: hitting.hits || "-",
      atBats: hitting.atBats || "-",
      baseOnBalls: hitting.baseOnBalls || "-",
      strikeOuts: hitting.strikeOuts || "-",

      // Pitching
      era: pitching.era || "-",
      wins: pitching.wins || "-",
      losses: pitching.losses || "-",
      pitchingStrikeOuts: pitching.strikeOuts || "-",
    };
  } catch (error) {
    console.error("Stats Error:", error);
    return null;
  }
}
export async function getTodayGames() {
  try {
    const today = new Date().toISOString().split("T")[0];

    const response = await fetch(
      `${BASE_URL}/schedule?sportId=1&date=${today}&hydrate=team`
    );

    const data = await response.json();

    return data.dates?.[0]?.games || [];
  } catch (error) {
    console.error("Games Error:", error);
    return [];
  }
}

export async function getPlayerGameLog(id) {


  try {


    const response = await fetch(

      `${BASE_URL}/people/${id}/stats?stats=gameLog&group=hitting`

    );


    const data = await response.json();



    const games =

      data.stats?.[0]
      ?.splits || [];



    return games.map((game)=>({


      date:

      game.date,


      avg:

      Number(game.stat.avg) || 0,


      ops:

      Number(game.stat.ops) || 0,


      homeRuns:

      Number(game.stat.homeRuns) || 0



    }));



  } catch(error) {


    console.error(

      "Game Log Error:",

      error

    );


    return [];


  }


}
/* =========================
   MLB STANDINGS
========================= */


export async function getStandings() {


  try {


    const response = await fetch(

      `${BASE_URL}/standings?leagueId=103,104&season=${new Date().getFullYear()}`

    );


    const data = await response.json();



    const divisionNames = {

      200: "American League West",
      201: "American League East",
      202: "American League Central",

      203: "National League West",
      204: "National League East",
      205: "National League Central"

    };




    const standings = [];




    data.records.forEach((record)=>{


      record.teamRecords.forEach((team)=>{


  standings.push({

  division:
  divisionNames[record.division.id],


  teamId:
  team.team.id,


  team:
  team.team.name,


  logo:

  `https://www.mlbstatic.com/team-logos/${team.team.id}.svg`,


  wins:
  team.wins,


  losses:
  team.losses,


  winPercentage:
  team.winningPercentage,


  gamesBack:
  team.gamesBack

});


});



    });




    return standings;



  } catch(error){


    console.error(
      "Standings Error:",
      error
    );


    return [];


  }


}
/* =========================
   TEAM DETAILS
========================= */

export async function getTeamDetails(teamId) {

  try {

    const response = await fetch(
      `${BASE_URL}/teams/${teamId}`
    );


    const data = await response.json();


    return data.teams?.[0] || null;


  } catch(error) {


    console.error(
      "Team Detail Error:",
      error
    );


    return null;


  }

}





/* =========================
   TEAM ROSTER
========================= */

export async function getTeamRoster(teamId) {


  try {


    const response = await fetch(
      `${BASE_URL}/teams/${teamId}/roster`
    );


    const data = await response.json();


    return data.roster || [];



  } catch(error) {


    console.error(
      "Roster Error:",
      error
    );


    return [];


  }


}
export async function getTeamStats(teamId) {

  try {

    const season = new Date().getFullYear();


    const res = await fetch(
      `${BASE_URL}/teams/${teamId}/stats?stats=season&group=hitting,pitching&season=${season}`
    );


    const data = await res.json();



    const hitting =
      data.stats?.find(
        stat => stat.group.displayName === "hitting"
      )
      ?.splits?.[0]?.stat || {};



    const pitching =
      data.stats?.find(
        stat => stat.group.displayName === "pitching"
      )
      ?.splits?.[0]?.stat || {};



    return {


      runs: hitting.runs || 0,

      homeRuns: hitting.homeRuns || 0,

      avg: hitting.avg || "-",

      ops: hitting.ops || "-",



      wins: pitching.wins || 0,

      losses: pitching.losses || 0,

      era: pitching.era || "-",

      winPercentage: pitching.winPercentage || "-"


    };



  } catch(error) {


    console.error(
      "Team Stats Error:",
      error
    );


    return null;


  }


}