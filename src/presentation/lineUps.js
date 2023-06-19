import React,{ ReactDOM } from 'react'
import { useState,useEffect } from 'react'
import getLinesUps from '../api/getLinesUps'
import '../styles/lineup.css';


function PlayerPosition(props){
           const lineup=props.lineup;
           const grid=props.grid.toString(); 

           const sp_lineup=lineup.filter((player)=>player.player.grid[0]===grid)
                .sort((playerA,playerB)=>parseInt(playerB.player.grid[2]) - parseInt(playerA.player.grid[2]))
            
            console.log('this is line up:',sp_lineup);
            
            return(
                <>
                    {
                        sp_lineup.map((player,index)=>{
                            return(
                                <div>
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
    const home=props.teams[0];
    const away=props.teams[1];
    const fixtureId=props.fixture;
    const [homeTeam,setHomeTeam]=useState("");
    const [awayTeam,setAwayTeam]=useState("");
    const [homeLineUp,setHomeLineUp]=useState([]);
    const [homeFormation,setHomeFormation]=useState([]);
    const [awayLineUp,setAwayLineUp]=useState([]);
    const [awayFormation,setAwayFormation]=useState([]);    
    let [clickedTeam,setClickedTeam]=useState("");   
    
    useEffect(()=>{
        getLinesUps(fixtureId).then((result)=>{
            setHomeLineUp(result.data.response[0].startXI);
            setHomeFormation(Array.from(result.data.response[0].formation.replaceAll('-','')));
            setHomeTeam(result.data.response[0].team.name);
            setAwayLineUp(result.data.response[1].startXI);
            setAwayFormation(Array.from(result.data.response[1].formation.replaceAll('-','')));
            setAwayTeam(result.data.response[1].team.name);
        })
    },[fixtureId]);

    // let homeFormationArr= [];
    // let awayFormationArr= [];

    console.log('Home start:',homeFormation);
    console.log('Away start:',awayFormation);                   
    
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
                            {homeFormation.length=== 3 ? 
                            
                                <>
                                <div className='line' key={1} style={{height:'25%'}}>
                                    <span>{homeLineUp[0].player.name}</span>
                                    <br></br>
                                    <span>{homeLineUp[0].player.number}</span>
                                </div>
                                
                                <div className='line' key={2} style={{height:'25%'}}>                                    
                                    <PlayerPosition lineup={homeLineUp} grid={"2"} />                                    
                                </div>
                                
                                <div className='line' key={3} style={{height:'25%'}}>                                    
                                    <PlayerPosition lineup={homeLineUp} grid={"3"} />                                   
                                </div>
                                
                                <div className='line' key={4} style={{height:'25%'}}>                                    
                                    <PlayerPosition lineup={homeLineUp} grid={"4"} />                                   
                                </div>
                                </>
                                                    
                            :
                            homeFormation.length=== 4 ?
                            (
                                <>
                                <div className='line' key={1} style={{height:'20%'}}>
                                    <span>{homeLineUp[0].player.name}</span>
                                    <br></br>
                                    <span>{homeLineUp[0].player.number}</span>
                                </div>
                                
                                <div className='line' key={2} style={{height:'20%'}}>                                    
                                    <PlayerPosition lineup={homeLineUp} grid={"2"} />                                    
                                </div>
                                
                                <div className='line' key={3} style={{height:'20%'}}>                                    
                                    <PlayerPosition lineup={homeLineUp} grid={"3"} />                                   
                                </div>
                                
                                <div className='line' key={4} style={{height:'20%'}}>                                    
                                    <PlayerPosition lineup={homeLineUp} grid={"4"} />                                   
                                </div>

                                <div className='line' key={5} style={{height:'20%'}}>                                   
                                    <PlayerPosition lineup={homeLineUp} grid={"5"} />                                   
                                </div>
                                </>
                            )
                            :
                            null
                            }
                        </div>
                    </>
                                                                    
                :

                clickedTeam==="a"? 
                <>
                    <div>Formation: {awayFormation.join('-')}</div> 
                    <div className='pitch'> 
                    {awayFormation.length=== 3 ? 
                    (
                        <>
                        <div  key={1} style={{display:'block',height:'25%'}}>
                            <span>{awayLineUp[0].player.name}</span>
                            <br></br>
                            <span>{awayLineUp[0].player.number}</span>
                        </div>
                        
                        <div className='line' key={2} style={{height:'25%'}}>                                    
                            <PlayerPosition lineup={awayLineUp} grid={"2"} />                                    
                        </div>
                        
                        <div className='line' key={3} style={{height:'25%'}}>                                    
                            <PlayerPosition lineup={awayLineUp} grid={"3"} />                                   
                        </div>
                        
                        <div className='line' key={4} style={{height:'25%'}}>                                    
                            <PlayerPosition lineup={awayLineUp} grid={"4"} />                                   
                        </div>
                        </>
                    )
                        
                    :
                    awayFormation.length=== 4 ?
                    (
                        <>
                        <div className='line' key={1} style={{height:'20%'}}>
                            <span>{awayLineUp[0].player.name}</span>
                            <br></br>
                            <span>{awayLineUp[0].player.number}</span>
                        </div>
                        
                        <div className='line' key={2} style={{height:'20%'}}>                                    
                            <PlayerPosition lineup={awayLineUp} grid={"2"} />                                    
                        </div>
                        
                        <div className='line' key={3} style={{height:'20%'}}>                                    
                            <PlayerPosition lineup={awayLineUp} grid={"3"} />                                   
                        </div>
                        
                        <div className='line' key={4} style={{height:'20%'}}>                                    
                            <PlayerPosition lineup={awayLineUp} grid={"4"} />                                   
                        </div>

                        <div className='line' key={5} style={{height:'20%'}}>                                   
                            <PlayerPosition lineup={awayLineUp} grid={"5"} />                                   
                        </div>
                        </>
                    )
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
