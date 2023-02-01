import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Standings from './presentation/Standings'

function App() {

  let [leagueId,setLeagueId]=useState(0)
  let [seasonId,setSeasonId]=useState(0)
  const year=new Date().getFullYear()
  return (
    <div className="App">
     <div>
      <button onClick={()=>{setLeagueId(2);setSeasonId(year)}}>UFL</button>
      <button onClick={()=>{setLeagueId(39);setSeasonId(year)}}>EPL</button>
      <button onClick={()=>{setLeagueId(140);setSeasonId(year)}}>La Liga</button>
      <button onClick={()=>{setLeagueId(135);setSeasonId(year)}}>Le Calcio</button>
      <button onClick={()=>{setLeagueId(78);setSeasonId(year)}}>Bundesliga</button>
      <button onClick={()=>{setLeagueId(61);setSeasonId(year)}}>Liga Un</button>
     </div>
    <Standings leagueId={leagueId} seasonId={seasonId}/>
    </div>
  );
}

export default App;
