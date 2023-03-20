import React, { Fragment } from "react";
import { useState,useEffect,useRef } from "react";
import getEvents from '../api/getEvents'
import '../styles/events.css'

function Events(props){
    
    const fixture=props.fixture
    const teams=props.teams
    const HOME_TEAM=teams[0],AWAY_TEAM=teams[1];

    const [events,setEvents]=useState([])
    const [homeMargin,setHomeMargin]=useState(0)
    const [awayMargin,setAwayMargin]=useState(0)
    const event_div=useRef(HTMLElement);
    useEffect(()=>{
        getEvents(fixture).then((result)=>{
           setEvents( result.data.response )
        })        
    },[fixture,teams])
    const eventsHome = events.filter((event)=>event.team.id===teams[0])
    const eventsAway = events.filter((event)=>event.team.id===teams[1])

    const GROUPED_EVENTS=events.reduce((group,elem)=>{
        const TIME=elem.time.elapsed;
        if(group[TIME]==null) group[TIME]=[];
        group[TIME].push(elem);
        return group;
    },[])
    console.log('grouped events: ',GROUPED_EVENTS)

    const home_events_div=(player,assist,type,index)=>{
        return(
            <div key={index} style={{display:'flex',justifyContent:'flex-end',margin:'5px auto'}}>
            <span>{type}</span>
            <div className="div-players">
                <label className="label-palyer">{player}</label><br></br>
                <label className="label-assist">{assist}</label>
            </div>
            </div>     )
    }

    const away_events_div=(player,assist,type,index)=>{
        return(
            <div key={index} style={{display:'flex',justifyContent:'flex-start',margin:'5px auto'}}>           
            <div className="div-players">
                <label className="label-palyer">{player}</label><br></br>
                <label className="label-assist">{assist}</label>
            </div>
            <span>{type}</span>
            </div>      )
    }

    let i=0;
    return(        
        <div className='events' >
            
            {                
                GROUPED_EVENTS.map((event,index)=>{                    
                    return(
                       
                            <div ref={event_div} key={index} style={{display:'flex',justifyContent:'center',margin:'5px auto',width:'70%'}}>
                                {
                                    <div style={{width:'40%',float:'right'}}>
                                        {
                                            eventsHome.map((event) => {                                        
                                                return(
                                                    event.time.elapsed===index? 
                                                    home_events_div(event.player.name,event.assist.name,event.type,i++):
                                                    null
                                                )                                                                                                                                
                                            })
                                        }
                                    </div>
                                    
                                }
                                <span style={{width:'5%'}}>{index}</span>
                                {
                                    <div style={{width:'40%',float:'left'}}>
                                        {
                                            eventsAway.map((event) => {
                                                                                
                                                return(
                                                    event.time.elapsed===index? 
                                                    away_events_div(event.player.name,event.assist.name,event.type,i++):
                                                    null
                                                )                                                                                        
                                            
                                            })
                                        }
                                    </div>
                                    
                                }  
                            </div>
                    )
                })
            }
        </div>
    )}
                        

export default Events