import React,{ ReactDOM } from 'react'
import { useState,useEffect } from 'react'
import getLinesUps from '../api/getLinesUps'
import '../styles/lineup.css';

function LineUps(props){
    const home=props.teams[0];
    const away=props.teams[1];
    const fixtureId=props.fixture;
    const [homeTeam,setHomeTeam]=useState("");
    const [awayTeam,setAwayTeam]=useState("");
    const [homeLineUp,setHomeLineUp]=useState([]);
    const [homeFormation,setHomeFormation]=useState("");
    const [awayLineUp,setAwayLineUp]=useState([]);
    const [awayFormation,setAwayFormation]=useState("");    
    let [clickedTeam,setClickedTeam]=useState("");
    let [grid,setGrid]=useState(0);
    
    useEffect(()=>{
        getLinesUps(fixtureId).then((result)=>{
            setHomeLineUp(result.data.response[0].startXI);
            setHomeFormation(result.data.response[0].formation);
            setHomeTeam(result.data.response[0].team.name);
            setAwayLineUp(result.data.response[1].startXI);
            setAwayFormation(result.data.response[1].formation);
            setAwayTeam(result.data.response[1].team.name);
        })
    },[fixtureId]);

    console.log('Home start:',homeLineUp);
    console.log('Away start:',awayLineUp);
    let homeFormationArr= Array.from(homeFormation.replace('-',''));
    let awayFormationArr= Array.from(awayFormation.replace('-',''));;
    // let clickedTeam=''; 
    let line_index=-1;
    
    function playerPosition(lineup,grid){       
            lineup.filter((player)=>player.player.grid[0]===grid)
                        .sort((playerA,playerB)=>parseInt(playerA.player.grid[2]) - parseInt(playerB.player.grid[2]))
                        .map((player,index)=>{
                            return(
                                <div key={index}>
                                    {player.player.name}
                                </div>
                            )
                        })        
    }
    
    return(    
        <div>                   
            <div style={{display:'flex',justifyContent:'center',width:'50%',margin:'auto'}}>
                <button onClick={()=>setClickedTeam("h")}>{homeTeam}</button>
                <button onClick={()=>setClickedTeam("a")}>{awayTeam}</button>
            </div>
            <div className='pitch'>
                {                    
                    clickedTeam==="h"?                                                                                                                                
                            
                            (
                              <div>
                                    hi
                                </div>
                            )
                            (
                                setGrid(1),
                                homeFormationArr.map((item,index)=>{                                   
                                    setGrid(grid++),
                                   <div className='line'>
                                    {playerPosition(homeLineUp,grid.toString())}
                                    </div>
                                })
                            )                                                   
                       
                    :

                    clickedTeam==="a"? 
                                          
                        (
                          <div>
                               hi
                            </div>
                        )
                        (
                            setGrid(1),
                            awayFormationArr.map((item,index)=>{                                
                                setGrid(grid++);
                                <div className='line'>
                                {playerPosition(awayLineUp,grid.toString())}
                                </div>
                            })
                        )
                       
                    :null                    
                }
            </div>
        </div>
    )
}

export default LineUps
