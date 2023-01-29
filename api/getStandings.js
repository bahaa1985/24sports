const axios =require("axios") 

function getStandings(leagueId,seasonId){
  let config = {
    method: 'GET',
    url: 'https://v3.football.api-sports.io/standings?league='+leagueId+'&season='+seasonId,
    headers: {
      'x-rapidapi-host': 'v3.football.api-sports.io',
      'x-rapidapi-key': '12c3d051c8f77e0840cd9c5e35fd8cd0'
    }
  };
  
  axios(config)
  .then((response)=>{
    return response.data.response[0].league.standings[0]
    //console.log(response.data.response[0].league.standings[0][0])
      // response.data.map((id,name)=>{
      //     ids.push(id)
      //     names.push(name)
      // })
      // dd.name=response.data.league.name;
      // dd.id=response.data.league.id
      // console.log(response.data.response[0].league)
      // console.log(JSON.stringify(response.data.response[0].league.name))
      // console.log(JSON.stringify(response.data.response[0].league.logo))
     
  })
  .catch((error)=>{
      console.log(error)
  })
}


export default getStandings


