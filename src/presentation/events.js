import React from "react";
import { useState,useEffect } from "react";
import getEvents from '../api/getEvents'

function Events(props){
    
    const fixture=props.fixture
    const teams=props.teams

    const [events,setEvents]=useState([])

    useEffect(()=>{
        getEvents(fixture).then((result)=>{
           setEvents( result.data.response )
        })        
    },[fixture,teams])
    //console.log('events: ',events)
    return(
        <div>
            {teams[0]} &nbsp {teams[1]}
        </div>
    )
}

export default Events