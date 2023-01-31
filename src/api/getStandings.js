import axios from 'axios'

async function getStandings(leagueId,seasonId){
  let config = {
    method: 'GET',
    url: 'https://v3.football.api-sports.io/standings?league='+leagueId+'&season='+seasonId,
    headers: {
      'x-rapidapi-host': 'v3.football.api-sports.io',
      'x-rapidapi-key': '12c3d051c8f77e0840cd9c5e35fd8cd0'
    }
  };
  
  return axios(config)
  
}


export default getStandings


