import React from "react";
import getStatistics from "../api/getStatistics";
import '../styles/statistics.css'
import { useEffect,useState } from "react";

function Statistics(props){
    const home_team=props.teams[0]
    const away_team=props.teams[1]
    const fixture=props.fixture
    const [homeStatistics,setHomeStatistics]=useState([])
    const [awayStatistics,setAwayStatistics]=useState([])
    
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
        console.log('home effect!')
    },[fixture,home_team])

    useEffect(()=>{
        getStatistics(fixture,away_team).then((result)=>{
            setAwayStatistics(result.data.response[0].statistics)
        });
        console.log('home effect!')
    },[fixture,away_team])
  
    let total,max,factor=0;
    let screen_width=window.innerWidth
    let prgress_width=(45*screen_width)/100
    return(
        <div>           
        {/* {            
            for(let i=0;i<homeStatistics.length;i++){
                statistic_obj={home:homeStatistics[i].value,
                                type:homeStatistics[i].type,
                                away:awayStatistics[i].value }
                statistics_arr.push(statistic_obj)
            }
        } */}
        {
            homeStatistics.map((home,i)=>{
                console.log('index',i)
                total=home.value+awayStatistics[i].value
                max=prgress_width
                factor=max/total                    
                return(
                <div>
                    <div>{home.type}</div>
                    <div className="statistics-details">
                        <span>{home.value}</span>
                        <div>
                            <progress className="progress-home" max={max} value={home.value*factor}></progress>
                        </div>
                        <div>
                            <progress className="progress-away" max={max} value={awayStatistics[i].value*factor}></progress>
                        </div>
                        <span>{awayStatistics[i].value}</span>
                    </div>
                </div>
                )
            }) 
        }
        </div>
    )
}

export default Statistics