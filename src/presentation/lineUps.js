import React,{ ReactDOM } from 'react'
import { useState,useEffect } from 'react'
import getLinesUps from '../api/getLinesUps'

function LineUps(props){
    const home=props.teams[0];
    const away=props.teams[1];
    const fixtureId=props.fixture;
    const [homeLineUp,setHomeLineUp]=useState([]);
    const [homeFormation,setHomeFormation]=useState("");
    const [awayLineUp,setAwayLineUp]=useState([]);
    const [awayFormation,setAwayFormation]=useState("");
    const [homeTeam,setHomeTeam]=useState("");
    const [awayTeam,setAwayTeam]=useState("");

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
    let hFormationArr= Array.from(homeFormation.replace('-',''));
    let aFormationArr= Array.from(awayFormation.replace('-',''));;
    let clickedTeam=''; 
    let player_index=0;
    let iterator=-1;
    return(
        <div>        
            <h1>Line ups</h1>
            <div style={{display:'flex',justifyContent:'space-between',width:'50%',margin:'auto'}}>
                <button onClick={()=>clickedTeam='h'}>{homeTeam}</button>
                <button onClick={()=>clickedTeam='a'}>{awayTeam}</button>
            </div>
            <div className='pitch'>
                {
                    clickedTeam=='h'? 
                        hFormationArr.map((item,index)=>{
                            return(
                                <div>
                                    {
                                        ()=>{
                                            for (let i = 0; index < hFormationArr[index]; i++) {
                                                player_index++;
                                                return(
                                                    <div>
                                                        {homeLineUp[player_index].player.name}
                                                    </div>
                                                )                                             
                                            }
                                        }                   
                                    }
                                </div>
                            )

                        })
                    :
                    clickedTeam=='a'? 
                        aFormationArr.map((item,index)=>{
                            <div>
                                 {awayLineUp[player_index].player.name}
                            </div>
                            return(
                                <div>
                                    {
                                        ()=>{
                                            for (let i = 0; index < aFormationArr[index]; i++) {
                                                player_index++;
                                                return(
                                                    <div>
                                                        {awayLineUp[player_index].player.name}
                                                    </div>
                                                )                                             
                                            }
                                        }                   
                                    }
                                </div>
                            )

                        })
                    :null
                }
            </div>
        </div>
    )
}

export default LineUps
