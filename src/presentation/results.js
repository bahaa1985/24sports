import React,{ memo,ReactDOM } from 'react'
import { useState,useEffect,useRef } from 'react'
import getResults from '../api/getResults'

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
        const date= new Date(elem.fixture.date.toString()). toDateString()  
        if(group[date]==null) group[date]=[]
        group[date].push(elem)
        return group
    },{})

    console.log('groupedResults: ',groupedResults)
    
    return(
        <div>
            <div>

            </div>
            <div>
                <img/>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <img/>
                <span></span>
            </div>            
        </div>
    )
}

export default Results