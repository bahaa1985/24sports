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

    const away_events_div=(player,assist,type,details,index)=>{
        return(
            <div key={index} style={{display:'flex',justifyContent:'flex-start',margin:'5px auto'}}>           
            <div className="div-players">
                <label className="label-palyer">{player}</label><br></br>
                <label className="label-assist">{assist}</label>
            </div>
            <span>{
            type=='Goal'&& details=='Normal Goal' ? 
            <a href="https://icons8.com/icon/PYXkVRuJka6y/goal"></a>:
            type=='Goal'&& details=='Penalty' ?
            <a href="https://icons8.com/icon/35572/penalty" title="soccer icons"></a>:
            type=='Goal'&& details== 'Own Goal' ?
            <a href="https://icons8.com/icon/107649/soccer-ball"></a>:
            type=='Goal'&& details=='Missed Pinalty' ?
            <a href="https://icons8.com/icon/N8wdFmPIwS0q/missed"></a>:
            type=='Card'&& details=='Yellow Card' ?
            <a href="https://icons8.com/icon/kFZBZ6gXs97J/yellow-card"></a>:
            type=='Card'&& details=='Red Card' ?
            <a href="https://icons8.com/icon/HBcAjJXG1erl/red-card"></a>:
            type=='Var'&& details=='Goal Cancelled' ?
            <a href="https://www.flaticon.com/free-icons/var" title="var icons">Var icons created by Marcus Christensen - Flaticon</a>&&<span>{details}</span>:
            type=='Var'&& details=='Penalty Confirmed' ?
            <a href="https://www.flaticon.com/free-icons/var" title="var icons">Var icons created by Marcus Christensen - Flaticon</a>&&<span>{details}</span>:
            null
            }</span>
            </div>      )
    }

    let i=0;
    return(        
        <div className='events' >
            
            {                
                GROUPED_EVENTS.map((event,index)=>{                    
                    return(
                       
                            <div ref={event_div} key={index} style={{display:'flex',justifyContent:'center',margin:'5px auto',width:'100%'}}>
                                {
                                    <div style={{width:'45%',float:'right'}}>
                                        {
                                            eventsHome.map((event) => {                                        
                                                return(
                                                    event.time.elapsed===index? 
                                                    home_events_div(event.player.name,event.assist.name,event.type,event.details,i++):
                                                    null
                                                )                                                                                                                                
                                            })
                                        }
                                    </div>
                                    
                                }
                                <span style={{width:'10%'}}>{index}</span>
                                {
                                    <div style={{width:'45%',float:'left'}}>
                                        {
                                            eventsAway.map((event) => {                                                                                
                                                return(
                                                    event.time.elapsed===index? 
                                                    away_events_div(event.player.name,event.assist.name,event.type,event.details,i++):
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