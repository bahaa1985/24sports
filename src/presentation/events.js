import React, { Fragment } from "react";
import { useState,useEffect } from "react";
import getEvents from '../api/getEvents'
import '../styles/events.css'

function Events(props){
    
    const fixture=props.fixture
    const teams=props.teams

    const [events,setEvents]=useState([])
    const [homeMargin,setHomeMargin]=useState(0)
    const [awayMargin,setAwayMargin]=useState(0)

    useEffect(()=>{
        getEvents(fixture).then((result)=>{
           setEvents( result.data.response )
        })        
    },[fixture,teams])
    const eventsHome = events.filter((event)=>event.team.id===teams[0])
    const eventsAway = events.filter((event)=>event.team.id===teams[1])
    return(
        <div className='events'>
            {
                <div className="events-home"> 
                    {
                    eventsHome.map((event,index)=>{
                        // {index>1 ? setHomeMargin(event.time.elapsed-eventsHome[index-1].time.elapsed):setHomeMargin(event.time.elapsed)}
                        return(
                            <div style={{marginTop:index>0 ?(event.time.elapsed-eventsHome[index-1].time.elapsed)*2:event.time.elapsed*2}}>
                                <span>{event.time.elapsed}</span>
                                {/* <span style={{position:'relative','top':event.time.elapsed}}>{event.team.name}</span> */}
                                <span >{event.player.name}</span>
                                <span >{event.type}</span>
                            </div>                          
                        )
                    })
                    }
                </div>
            }
            {
                <div className="events-away">
                {
                    eventsAway.map((event,index)=>{  
                        // {index>1 ? setAwayMargin(event.time.elapsed-eventsAway[index-1].time.elapsed):setAwayMargin(event.time.elapsed)}                  
                    return(
                        <div style={{marginTop:index>0 ?(event.time.elapsed-eventsAway[index-1].time.elapsed)*2:event.time.elapsed*2}}>                         
                            <span >{event.time.elapsed}</span>
                            {/* <span style={{position:'relative','top':event.time.elapsed}}>{event.team.name}</span> */}
                            <span >{event.player.name}</span>
                            <span >{event.type}</span>
                        </div>
                        )
                    })
                }
                </div>
                
            }
        </div>
    )
}

export default Events