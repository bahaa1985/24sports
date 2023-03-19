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
    const events_div=useRef();
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
    return(
      
        <div className='events' ref={events_div}>
            
            {
                GROUPED_EVENTS.map((event,index)=>{                    
                    return(
                        <Fragment>
                            <div>{index}</div>
                        </Fragment>
                    )
                })
                    // if(event.length==1){
                    //     return(
                    //         <Fragment key={index}>
                    //         {
                    //            <div className="event">                                
                    //             {event[0].team.id===HOME_TEAM?
                    //                 <Fragment>
                    //                     <div className="div-details" style={{justifyContent:'flex-end'}}>
                    //                         <span className="span-type">{event[0].type}</span>
                    //                         <div className="div-players" style={{textAlign:'right'}}>
                    //                             <label className="label-palyer">{event[0].player.name}</label><br></br>
                    //                             <label className="label-assist">{event[0].assist.name}</label>
                    //                         </div>
                    //                     </div>                                       
                    //                     <span className="span-time">{index}</span>
                    //                     <div className="div-empty">
                    //                         <label className="span-empty"></label>                                            
                    //                     </div>
                                      
                    //                 </Fragment>:null
                                    
                    //             }
                               
                    //             {event[0].team.id===AWAY_TEAM?
                                                                       
                    //                 <Fragment>
                    //                     <div className="div-empty">
                    //                         <label className="span-empty"></label>                                       
                    //                     </div>
                    //                     <span className="span-time">{index}</span>
                    //                     <div className="div-details" style={{justifyContent:'flex-start'}}>
                    //                         <div className="div-players" style={{textAlign:'left'}}>
                    //                             <label className="label-player">{event[0].player.name}</label><br></br>
                    //                             <label className="label-assist">{event[0].assist.name}</label>                                            
                    //                         </div>                                     
                    //                         <span className="span-type">{event[0].type}</span>
                    //                     </div>                                       
                                        
                    //              </Fragment>:null
                    //             }
                    //            </div>
                    //         }                            
                    //     </Fragment> 
                    //     )
                    // }                                  
            }
            {
                events_div.current.children.forEach(event_div => {
                    eventsHome.map(homeEvent,index)
                })
            }
        </div>
        
    )
}

export default Events