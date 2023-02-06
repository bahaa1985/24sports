import React,{ memo,ReactDOM } from 'react'
import { useState,useEffect,useRef } from 'react'
import getResults from '../api/getResults'
import results from '../styles/results.css'

function Results(props){
    const [results,setResults]=useState([])
    // const effect=useRef(false)
    const league=props.league
    const season=props.season
          
    useEffect(()=>{                                                  
        getResults(league,season).then((response)=>{                                 
            setResults( response.data.response )
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
                        {console.log('index: ',index)}
                        {groupedResults[elem].map((fixture)=>{
                            return(
                            <div className="fixture">
                                <img src={fixture.teams.home.logo}></img>
                                <span>{fixture.teams.home.name}</span>
                                <span>{fixture.goals.home}</span>                                
                                <span>{fixture.goals.away}</span>
                                <span>{fixture.teams.away.name}</span>
                                <img src={fixture.teams.away.logo}></img>
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