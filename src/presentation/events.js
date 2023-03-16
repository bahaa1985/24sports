import React, { Fragment } from "react";
import { useState,useEffect } from "react";
import getEvents from '../api/getEvents'
import '../styles/events.css'

function Events(props){
    
    const fixture=props.fixture
    const teams=props.teams
    const HOME_TEAM=teams[0],AWAY_TEAM=teams[1];

    const [events,setEvents]=useState([])
    const [homeMargin,setHomeMargin]=useState(0)
    const [awayMargin,setAwayMargin]=useState(0)

    useEffect(()=>{
        getEvents(fixture).then((result)=>{
           setEvents( result.data.response )
        })        
    },[fixture,teams])
    // const eventsHome = events.filter((event)=>event.team.id===teams[0])
    // const eventsAway = events.filter((event)=>event.team.id===teams[1])

    const GROUPED_EVENTS=events.reduce((group,elem)=>{
        const TIME=elem.time.elapsed;
        if(group[TIME]==null) group[TIME]=[];
        group[TIME].push(elem);
        return group;
    },[])
    console.log('grouped events: ',GROUPED_EVENTS)
    return(
      
        <div className='events'>
            
            {
                GROUPED_EVENTS.map((event,index)=>{
                    if(event.length==1){
                        return(
                            <Fragment key={index}>
                            {
                               <div className="event">                                
                                {event[0].team.id===HOME_TEAM?
                                    <Fragment>
                                        <div className="div-details">
                                            <span className="span-type">{event[0].type}</span>
                                            <div className="div-players">
                                                <label className="label-palyer">{event[0].player.name}</label><br></br>
                                                <label className="label-assist">{event[0].assist.name}</label>
                                            </div>
                                        </div>                                       
                                        <span className="span-time">{event[0].time.elapsed}</span>
                                        <div className="div-empty">
                                            <label className="span-empty"></label>                                            
                                        </div>
                                      
                                    </Fragment>:null
                                    // :
                                    // <Fragment>
                                    //      <Fragment>
                                    //         <span className="span-empty"></span>                                            
                                    //     </Fragment>
                                    //     <span className="span-time">{event[0].time.elapsed}</span>
                                    //     <Fragment classsName="fragment-players">
                                    //         <span className="span-player">{event[0].player.name}</span>
                                    //         <span className="span-assist">{event[0].assist.name}</span>
                                    //     </Fragment>
                                    //     <span className="span-type">{event[0].type}</span>
                                    // </Fragment>
                                }
                               
                                {event[0].team.id===AWAY_TEAM?
                                                                       
                                    <Fragment>
                                        <div className="div-empty">
                                            <label className="span-empty"></label>                                       
                                        </div>
                                        <span className="span-time">{event[0].time.elapsed}</span>
                                        <div className="div-details">
                                            <div className="div-players">
                                                <label className="label-player">{event[0].player.name}</label><br></br>
                                                <label className="label-assist">{event[0].assist.name}</label>                                            
                                            </div>                                     
                                            <span className="span-type">{event[0].type}</span>
                                        </div>                                       
                                        
                                 </Fragment>:null
                                }
                               </div>
                            }
                            
                        </Fragment> 
                        )
                    }
                    
                })
                // events.map((event,index)=>{
                //     return(
                //         <Fragment>
                //             {
                //                event.team.id==teams[0]? <div class="event" style={{marginLeft:0,marginTop:'20px',marginBottom:'20px',textAlign:'right',paddingRight:'2.5%'}}>                                   
                //                     <span >{event.type}</span>
                //                     <span >{event.player.name}</span>
                //                     {event.assist.name!=null?<span>{event.assist.name}</span>:null}                                   
                //                     <span>{event.time.elapsed}</span>
                //                </div> 
                //                :<div class="event" style={{marginLeft:'50%',marginTop:'20px',marginBottom:'20px',textAlign:'left',paddingLeft:'2.5%'}}>
                //                     <span >{event.time.elapsed}</span>                       
                //                     <span >{event.player.name}</span>
                //                     {event.assist.name!=null?<span>{event.assist.name}</span>:null}
                //                     <span >{event.type}</span>
                //                </div>
                                
                //             }
                            
                //         </Fragment>
                //     )
                // })
            }
        </div>
    )
}

export default Events