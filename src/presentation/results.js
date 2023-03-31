import React,{ ReactDOM } from 'react'
import { useState,useEffect,useRef } from 'react'
import getResults from '../api/getResults'
import  '../styles/results.css'
import Events from './events'
import Statistics from './statistics'



function Results(props){
    const [results,setResults]=useState([])
    const [fixture,setFixture]=useState(0)
    const [teams,setTeams]=useState([])
    const [clickedFixture,setClickedFixture]=useState(0)
   
    const league=props.league
    const season=props.season
          
    useEffect(()=>{                                                  
        getResults(league,season).then((result)=>{                                 
            setResults( result.data.response )
        });
    },[league,season])
            
    const groupedResults=results.reduce((group,elem)=>{            
        const date= new Date(elem.fixture.date).toDateString()  
        if(group[date]==null) group[date]=[]
        group[date].push(elem)
        return group
    },{})

    let i=0;
    return(
        <div>
            {               
               Object.keys(groupedResults).sort((a,b)=>Date.parse(a)-Date.parse(b)).map((elem,day_index)=>{
                              
                return(
                    <div>                
                        <div key={day_index} className="fixture-date"> {elem} </div>                                     
                        {groupedResults[elem].map((elem,fixture_index)=>{
                            return(
                                <div key={i++}>
                                    <div key={fixture_index} className="fixture" 
                                        onClick={()=>{setClickedFixture(elem.fixture.id);setTeams([elem.teams.home.id,elem.teams.away.id])}}>
                                        <div className="fixture-teams" key={elem.fixture.id}>
                                            <img src={elem.teams.home.logo}></img>
                                            <span className='team'>{elem.teams.home.name}</span>
                                            <span className='result'>{elem.goals.home}</span>                                
                                            <span className='result'>{elem.goals.away}</span>
                                            <span className='team'>{elem.teams.away.name}</span>
                                            <img src={elem.teams.away.logo}></img>                                             
                                        </div>                                                                            
                                    </div> 
                                   <div>
                                    <button onClick={()=>{setFixture(elem.fixture.id)}}>Events</button>
                                    <button onClick={()=>{setFixture(elem.fixture.id)}}>Statistics</button>
                                    <div>
                                        <Events fixture={fixture} teams={teams}/>
                                        <Statistics fixture={fixture} teams={teams}/>
                                    </div>                                    
                                   </div>
                                </div>

                            )
                        })}                         
                        </div>                                 
                    )               
                })
            }
                                                         
        </div>
    )
}

export default Results