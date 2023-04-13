import React from "react";
import getStatistics from "../api/getStatistics";
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
    
    useEffect(()=>{
        getStatistics(fixture,home_team).then((result)=>{
            setHomeStatistics(result.data.response[0].statistics)
        });        
    },[fixture,home_team])

    useEffect(()=>{
        getStatistics(fixture,away_team).then((result)=>{
            setAwayStatistics(result.data.response[0].statistics)
        });
    },[fixture,away_team])
    console.log('home_st',homeStatistics)
    console.log('away_st',awayStatistics)

    const statistics_arr=[];
    for(let i=0;i<15;i++){
        statistic_obj={home:homeStatistics[i].value,
                       type:homeStatistics[i].type,
                        away:awayStatistics[i].value }
        statistics_arr.push(statistic_obj)
    }
        
    // homeStatistics.forEach(element => {
    //     Object.defineProperty(element,'away',{value:})                
    //     statistic_obj={home:element.value,away:awayStatistics[i++].value,type:element.type}
    //     statistics_arr.push(statistic_obj)
    // });    

    console.log('statistics',statistics_arr);

    return(
        <div>
            {/* {
                homeStatistics.map((elem)=>{

                })
            }
            {

            } */}
        </div>
    )
}

export default Statistics