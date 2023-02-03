import React,{ memo,ReactDOM } from 'react'
import { useState,useEffect,useRef } from 'react'
import getResults from '../api/getResults'

function Results(props){
    const [results,setResults]=useState([])
    const league=props.league
    const season=props.season
    
    useEffect(()=>{                                 
            getResults(league,season).then((response)=>{        
                setResults( response.data.response[0] )                                          
            })             
    },[props])
    console.log(results)
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