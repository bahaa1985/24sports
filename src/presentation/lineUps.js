import React,{ ReactDOM } from 'react'
import { useState,useEffect } from 'react'
import getLinesUps from '../api/getLinesUps'
import getPlayers from '../api/getPlayers';
import '../styles/lineup.css';


function PlayerPosition(props){
           const lineup=props.lineup;
           const grid=props.grid.toString(); 

           const sp_lineup=lineup.filter((player)=>player.player.grid[0]===grid)
                .sort((playerA,playerB)=>parseInt(playerB.player.grid[2]) - parseInt(playerA.player.grid[2]))
                       
            return(
                <>
                    {                    
                        sp_lineup.map((player,index)=>{
                            return(
                                <div key={index}>
                                <span>{player.player.name}</span>
                                <br/>
                                <span>{player.player.number}</span>
                                </div>
                            )
                        })                       
                    }
                </>
            )
                                                   
}

function LineUps(props){
    const homeId=props.teams[0];
    const awayId=props.teams[1];
    const fixtureId=props.fixture;
    const [homeTeam,setHomeTeam]=useState("");
    const [awayTeam,setAwayTeam]=useState("");
    const [homeLineUp,setHomeLineUp]=useState([]);
    const [homeFormation,setHomeFormation]=useState([]);
    const [awayLineUp,setAwayLineUp]=useState([]);
    const [awayFormation,setAwayFormation]=useState([]);
    const [homePlayers,setHomePlayers] =useState([]);   
    const [awayPlayers,setAwayPlayers] =useState([]);
    let [clickedTeam,setClickedTeam]=useState("");   
    
    useEffect(()=>{ // call formation and line up players:
        getLinesUps(fixtureId).then((result)=>{
            setHomeLineUp(result.data.response[0].startXI);
            setHomeFormation(Array.from(result.data.response[0].formation.replaceAll('-','')));
            setHomeTeam(result.data.response[0].team.name);
            setAwayLineUp(result.data.response[1].startXI);
            setAwayFormation(Array.from(result.data.response[1].formation.replaceAll('-','')));
            setAwayTeam(result.data.response[1].team.name);

            getPlayers(fixtureId).then((result)=>{
                setHomePlayers(result.data.response[0].players);
                setAwayPlayers(result.data.response[1].players);
            });  
        })
    },[fixtureId]);

    useEffect(()=>{ // call home players' statistics:
            
    },[fixtureId])

    console.log('Home start:',homePlayers);
    console.log('Away start:',awayPlayers);                   
    
    return(    
        <div>                   
            <div style={{display:'flex',justifyContent:'center',width:'50%',margin:'auto'}}>
                <button onClick={()=>setClickedTeam("h")}>{homeTeam}</button>
                <button onClick={()=>setClickedTeam("a")}>{awayTeam}</button>
            </div>
           
                {                    
                    clickedTeam==="h"?
                    <>
                        <div>Formation: {homeFormation.join('-')}</div> 
                        <div className='pitch'>
                        <div className='goalkeeper' key={1}>
                                    <div>
                                        <span>{homeLineUp[0].player.name}</span>
                                        <br></br>
                                        <span>{homeLineUp[0].player.number}</span>
                                    </div>
                                    
                                </div>
                                
                                <div className='line' key={2} >                                    
                                    <PlayerPosition lineup={homeLineUp} grid={"2"} />                                    
                                </div>
                                
                                <div className='line' key={3} >                                    
                                    <PlayerPosition lineup={homeLineUp} grid={"3"} />                                   
                                </div>
                                
                                <div className='line' key={4}>                                    
                                    <PlayerPosition lineup={homeLineUp} grid={"4"} />                                   
                                </div>
                                {
                                    homeFormation.length>3 ?
                                    <div className='line' key={5} >                                   
                                        <PlayerPosition lineup={homeLineUp} grid={"5"} />                                   
                                    </div>:null
                                }                            
                        </div>
                    </>
                                                                    
                :

                clickedTeam==="a"? 
                <>
                    <div>Formation: {awayFormation.join('-')}</div> 
                    <div className='pitch'> 
                    <div className='goalkeeper' key={1} >
                            <div>
                                <span>{awayLineUp[0].player.name}</span>
                                <br></br>
                                <span>{awayLineUp[0].player.number}</span>
                            </div>
                            
                        </div>
                        
                        <div className='line' key={2}>                                    
                            <PlayerPosition lineup={awayLineUp} grid={"2"} />                                    
                        </div>
                        
                        <div className='line' key={3} >                                    
                            <PlayerPosition lineup={awayLineUp} grid={"3"} />                                   
                        </div>
                        
                        <div className='line' key={4} >                                    
                            <PlayerPosition lineup={awayLineUp} grid={"4"} />                                   
                        </div>
                         {
                            awayFormation.length > 3 ? 
                                <div className='line' key={5} >                                   
                                    <PlayerPosition lineup={awayLineUp} grid={"5"} />                                   
                                </div>
                            :null
                        }                   
                    </div>
                </>                                          
                :
                null  
            }
        </div>
    )
}

export default LineUps
