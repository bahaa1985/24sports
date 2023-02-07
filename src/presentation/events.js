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
    console.log('events: ',events)
    return(
        <div>
            {console.log(...teams)}
        </div>
    )
}

export default Events