import React from "react";
import getStatistics from "../api/getStatistics";
import '../styles/statistics.css'
import { useEffect,useState } from "react";

function Statistics(props){
    const home_team=props.teams[0]
    const away_team=props.teams[1]
    const fixture=props.fixture
    const [homeStatistics,setHomeStatistics]=useState(0)
    const [awayStatistics,setAwayStatistics]=useState(0)
    
    let statistic_obj={
        home:'',
        away:'',
        type:''
    }
    
    const statistics_arr=[];
    
    useEffect(()=>{
        getStatistics(fixture,home_team).then((result)=>{
            setHomeStatistics(result.data.response[0].statistics)
        }); 
        getStatistics(fixture,away_team).then((result)=>{
            setAwayStatistics(result.data.response[0].statistics)
        });                
             
    },[fixture,home_team,away_team])

    let home_arr=Array.from(homeStatistics)
    let away_arr=Array.from(awayStatistics);    

    for(let i=0;i<16;i++){
        statistic_obj={home:home_arr[i].value,
                        type:home_arr[i].type,
                        away:away_arr[i].value }
        statistics_arr.push(statistic_obj)
    }  

    let total,max,factor=0;
    let screen_width=window.innerWidth
    let prgress_width=(45*screen_width)/100
    return(
        <div>           
            {      
            statistics_arr.map((element,index)=>{
                total=element.home+element.away
                max=prgress_width
                factor=max/total                    
                return(
                <div>
                    <div>{element.type}</div>
                    <div className="statistics-details">
                        <span>{element.home}</span>
                        <div>
                            <progress max={max} value={element.home*factor}></progress>
                        </div>
                        <div>
                            <progress max={max} value={element.away*factor}></progress>
                        </div>
                        <span>{element.away}</span>
                    </div>
                </div>
                )
            })                          
                
            }
        </div>
    )
}

export default Statistics