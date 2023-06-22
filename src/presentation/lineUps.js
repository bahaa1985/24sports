import React,{ ReactDOM } from 'react'
import { useState,useEffect } from 'react'
import getLinesUps from '../api/getLinesUps'
import getPlayers from '../api/getPlayers';
import '../styles/lineup.css';
import goal from '../images/goal.png'


function PlayerPosition(props){
           const lineup=props.lineup;
           const grid=props.grid.toString(); 
   
           const sp_lineup=lineup.filter((player)=>player.player.grid[0]===grid)
                .sort((playerA,playerB)=>parseInt(playerB.player.grid[2]) - parseInt(playerA.player.grid[2]))                      
                       
            let ratingColor="";
            return(
                <>
                    {                    
                        sp_lineup.map((player,index)=>{
                           
                            return(
                            <div key={index} className='player-card' >                                                                                                                                                  
                                <div className="player-rating" style={{ backgroundColor:player.statistics[0].games.ratingColor}}>
                                    {player.statistics[0].games.rating}
                                </div>                                
                                    {
                                        player.statistics[0].goals.total > 0 ? 
                                            <img className='player-action' src={goal}></img>
                                        :null
                                    }                                
                                <img className='player-photo' src={player.player.photo}></img>
                                
                                <div className='player-number'>{player.player.number}</div>

                                <div className='player-name'>{player.player.name}</div>                                                                                                                                        
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
        })        

        getPlayers(fixtureId).then((result)=>{
            setHomePlayers(result.data.response[0].players);
            setAwayPlayers(result.data.response[1].players);
        });   
        

    },[fixtureId]);

    homeLineUp.forEach((player,index)=>{
        homePlayers.forEach((home_player,index)=>{
            if(player.player.id===home_player.player.id)
            {
                player.player.photo=home_player.player.photo;
                player.statistics=home_player.statistics; 
                if(player.statistics[0].games.rating>=0 && player.statistics[0].games.rating<5) 
                    {player.statistics[0].games.ratingColor='red'}
                else if(player.statistics[0].games.rating>=5 && player.statistics[0].games.rating<7)
                    {player.statistics[0].games.ratingColor='orange'}
                else if(player.statistics[0].games.rating>=7 && player.statistics[0].games.rating<9)
                    {player.statistics[0].games.ratingColor='green'}
                else if(player.statistics[0].games.rating>=9)
                    {player.statistics[0].games.ratingColor='blue'}
            }            
        })           
    })

    awayLineUp.forEach((player,index)=>{
        awayPlayers.forEach((away_player,index)=>{
            if(player.player.id===away_player.player.id)
            {
                player.player.photo=away_player.player.photo;
                player.statistics=away_player.statistics;
                if(player.statistics[0].games.rating>=0 && player.statistics[0].games.rating<5) 
                    {player.statistics[0].games.ratingColor='red'}
                else if(player.statistics[0].games.rating>=5 && player.statistics[0].games.rating<7)
                    {player.statistics[0].games.ratingColor='orange'}
                else if(player.statistics[0].games.rating>=7 && player.statistics[0].games.rating<9)
                    {player.statistics[0].games.ratingColor='green'}
                else if(player.statistics[0].games.rating>=9)
                    {player.statistics[0].games.ratingColor='blue'}                     
            }                
        }) 
    })    

    console.log('Home players:',homePlayers);
    console.log('Home lineup:',homeLineUp);                  
    
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
                            <div className='line' key={1} >                                   
                               <PlayerPosition lineup={homeLineUp}  grid={"1"}/>
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
                        <div className='line' key={1} > 
                            <PlayerPosition lineup={awayLineUp}  grid={"1"}/>
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
