import React,{ ReactDOM } from 'react'
import { useState,useEffect,useRef } from 'react'
import getResults from '../api/getResults'
import  '../styles/results.css'
import Events from './events'



function Results(props){
    const [results,setResults]=useState([])
    const [fixture,setFixture]=useState(0)
    const [teams,setTeams]=useState([])
    const [clicked,setClicked]=useState(false)
    const [indexx,setIndex]=useState(0)
    const fixtureRef=useRef(null)
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

    // console.log('groupedResults: ',groupedResults)
    
    useEffect(()=>{
        const divv=document.getElementsByClassName('.fixture')[indexx]
        // console.log('divv:',divv)
    },[indexx])  

    return(
        <div>
            {               
               Object.keys(groupedResults).sort((a,b)=>Date.parse(a)-Date.parse(b)).map((elem,day_index)=>{
                              
                return(
                    <div>                
                        <div key={day_index} className="fixture-date"> {elem} </div>                                     
                        {groupedResults[elem].map((elem,fixture_index)=>{
                            return(
                                <div>
                                    <div key={fixture_index} className="fixture" ref={fixtureRef} 
                                        onClick={()=>{                                           
                                            setIndex(index)
                                        }}
                                             >
                                        <img src={elem.teams.home.logo}></img>
                                        <span>{elem.teams.home.name}</span>
                                        <span>{elem.goals.home}</span>                                
                                        <span>{elem.goals.away}</span>
                                        <span>{elem.teams.away.name}</span>
                                        <img src={elem.teams.away.logo}></img>
                                        <button>{index}</button>
                                    </div> 
                                    {clicked ? <Events fixture={fixture} teams={teams}/> : null}
                                </div>

                            )
                        })} 
                        
                        </div>                                 
                    )               
                })
            }
                                                         
        </div>
    )

    // append events jsx to fixture div after clicking details button:
    function appendFixtureDetailsDiv(ref){
    // const fixture_divs=document.getElementsByClassName('.fixture') 
    console.log('fixture divs:',ref)
    // fixture_divs.forEach(div => {
        // div.removeChild(Events)
    // });   
    // fixture_divs[index].appendChild(Events)
    }
}

export default Results