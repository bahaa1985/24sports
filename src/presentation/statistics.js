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
    },[])

    useEffect(()=>{
        getStatistics(fixture,away_team).then((result)=>{
            setAwayStatistics(result.data.response[0].statistics)
        });
        console.log('home effect!')
    },[])

    // let home_arr=Array.from(homeStatistics)
    // let away_arr=Array.from(awayStatistics);    

   
    let total,max,factor=0;
    let screen_width=window.innerWidth
    let prgress_width=(45*screen_width)/100
    return(
        <div>           
            {
                homeStatistics.map((index,value)=>{
                    <span>{value.type}</span>
                })
                // ()=>{             
                //     for(let i=0;i<homeStatistics.length;i++){
                //        statistic_obj={home:homeStatistics[i].value,
                //                        type:homeStatistics[i].type,
                //                        away:awayStatistics[i].value }
                //        statistics_arr.push(statistic_obj)
                //    }  
                    
                //    statistics_arr.map((element,index)=>{
                //        total=element.home+element.away
                //        max=prgress_width
                //        factor=max/total                    
                //        return(
                //        <div>
                //            <div>{element.type}</div>
                //            <div className="statistics-details">
                //                <span>{element.home}</span>
                //                <div>
                //                    <progress max={max} value={element.home*factor}></progress>
                //                </div>
                //                <div>
                //                    <progress max={max} value={element.away*factor}></progress>
                //                </div>
                //                <span>{element.away}</span>
                //            </div>
                //        </div>
                //        )
                //    })                          
                       
                //    }
            }
        </div>
    )
}

export default Statistics