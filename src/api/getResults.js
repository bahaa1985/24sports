import axios from 'axios'

 function getResults(league,season){
  let config = {
    method: 'GET',
    url: `https://v3.football.api-sports.io/fixtures?&ids=867946-867947-867948`,
    headers: {
      'x-rapidapi-host': 'v3.football.api-sports.io',
      'x-rapidapi-key': '12c3d051c8f77e0840cd9c5e35fd8cd0'
    }
  };
  
  return axios(config)
  
}


export default getResults


