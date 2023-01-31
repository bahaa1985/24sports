import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Standings from './presentation/Standings'

function App() {
  //let standingsInfo={leagueId:leagueId,seasonId:seasonId}
  let [leagueId,setLeagueId]=useState(0)
  let [seasonId,setSeasonId]=useState(0)
  return (
    <div className="App">
     <div>
      <button>UFL</button>
      <button  onClick={()=>{setLeagueId(39);setSeasonId(2022)}}>EPL</button>
      <button>La Liga</button>
      <button>Le Calcio</button>
      <button>Bundesliga</button>
      <button>Liga Un</button>
     </div>
    <Standings leagueId={leagueId} seasonId={seasonId}/>
    </div>
  );
}

export default App;
