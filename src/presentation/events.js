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
            {/* {
                <div className="events-home"> 
                    {
                    eventsHome.map((event,index)=>{
                        
                        return(
                            <div style={{marginTop:index>0 ?(event.time.elapsed-eventsHome[index-1].time.elapsed)*3:event.time.elapsed*3}}>
                                <span>{event.time.elapsed}</span>
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
                       
                    return(
                        <div style={{marginTop:index>0 ?(event.time.elapsed-eventsAway[index-1].time.elapsed)*3:event.time.elapsed*3}}>                         
                            <span >{event.time.elapsed}</span>                       
                            <span >{event.player.name}</span>
                            <span >{event.type}</span>
                        </div>
                        )
                    })
                }
                </div>
                
            } */}
            {
                events.map((event,index)=>{
                    return(
                        <Fragment>
                            {
                               event.team.id==teams[0]? <div class="event" style={{marginLeft:0,marginTop:'20px',marginBottom:'20px',textAlign:'right',paddingRight:'2.5%'}}>                                   
                                    <span >{event.type}</span>
                                    <span >{event.player.name}</span>
                                    {event.assist.name!=null?<span>{event.assist.name}</span>:null}                                   
                                    <span>{event.time.elapsed}</span>
                               </div> 
                               :<div class="event" style={{marginLeft:'50%',marginTop:'20px',marginBottom:'20px',textAlign:'left',paddingLeft:'2.5%'}}>
                                    <span >{event.time.elapsed}</span>                       
                                    <span >{event.player.name}</span>
                                    {event.assist.name!=null?<span>{event.assist.name}</span>:null}
                                    <span >{event.type}</span>
                               </div>
                                
                            }
                            
                        </Fragment>
                    )
                })
            }
        </div>
    )
}

export default Events