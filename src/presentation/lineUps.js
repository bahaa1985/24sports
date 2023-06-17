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
    const [homeFormation,setHomeFormation]=useState([]);
    const [awayLineUp,setAwayLineUp]=useState([]);
    const [awayFormation,setAwayFormation]=useState([]);    
    let [clickedTeam,setClickedTeam]=useState("");
    let [grid,setGrid]=useState(0);
    
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

    // console.log('Home start:',homeLineUp);
    // console.log('Away start:',awayLineUp);
               
    function playerPosition(lineup,grid){
            console.log('this is line up:',lineup)       
            // lineup.filter((player)=>player.player.grid[0]===grid)
            //             .sort((playerA,playerB)=>parseInt(playerA.player.grid[2]) - parseInt(playerB.player.grid[2]))
            //             .map((player,index)=>{                            
            //                     <div key={index}>
            //                         {player.player.name}
            //                     </div>                            
            //             }) 
            lineup.forEach(element => {
                return(<div>{element}</div>)
            });       
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
                        [                           
                            <div>hi home</div>, 
                            homeFormation.map((item,index)=>{                                                        
                                <div className='line' key={index}>
                                {
                                    playerPosition(homeLineUp,(index+2).toString())                                                                           
                                }
                                </div>
                            })
                        ]                                                   
                    :

                    clickedTeam==="a"? 
                                          
                        [                       
                          <div>hi away</div>,                        
                            awayFormation.map((item,index)=>{                                                
                                <div className='line'>
                                {playerPosition(awayLineUp,(index+2).toString())}                    
                                </div>
                            })
                        ]
                       
                    :null                    
                }
            </div>
        </div>
    )
}

export default LineUps
