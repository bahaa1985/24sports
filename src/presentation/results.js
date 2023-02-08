import React,{ ReactDOM } from 'react'
import { useState,useEffect,useRef } from 'react'
import getResults from '../api/getResults'
import  '../styles/results.css'
import Events from './events'

function Results(props){
    const [results,setResults]=useState([])
    const [fixture,setFixture]=useState(0)
    const [teams,setTeams]=useState([])
    // const effect=useRef(false)
    const league=props.league
    const season=props.season
          
    useEffect(()=>{                                                  
        getResults(league,season).then((result)=>{                                 
            setResults( result.data.response )
    })},[league,season])
            
    const groupedResults=results.reduce((group,elem)=>{            
        const date= new Date(elem.fixture.date).toDateString()  
        if(group[date]==null) group[date]=[]
        group[date].push(elem)
        return group
    },{})

    console.log('groupedResults: ',groupedResults)
    
    return(
        <div>
            {               
               Object.keys(groupedResults).sort((a,b)=>Date.parse(a)-Date.parse(b)).map((elem,index)=>{
                              
                return(
                    <div>                
                        <div key={index} className="fixture-date"> {elem} </div>                                     
                        {groupedResults[elem].map((elem,index)=>{
                            return(
                                <div>
                                    <div key={index} className="fixture" >
                                        <img src={elem.teams.home.logo}></img>
                                        <span>{elem.teams.home.name}</span>
                                        <span>{elem.goals.home}</span>                                
                                        <span>{elem.goals.away}</span>
                                        <span>{elem.teams.away.name}</span>
                                        <img src={elem.teams.away.logo}></img>
                                        <button  onClick={()=>{setFixture(elem.fixture.id);
                                                 setTeams([elem.teams.home.id,elem.teams.away.id])}} >Details</button>
                                    </div> 
                                    
                                </div>
                            
                            )
                        })} 
                        
                        </div>                                 
                    )               
                })
            }
            <Events fixture={fixture} teams={teams}/>                                             
        </div>
    )
}

export default Results