import React from "react";
import getStatistics from "../api/getStatistics";
import { useEffect,useState } from "react";

function Statistics(props){
    const teams=props.teams
    const fixture=props.fixture
    const [homeStatistics,setHomeStatistics]=useState(0)
    const [awayStatistics,setAwayStatistics]=useState(0)
    useEffect(()=>{
        getStatistics(fixture,teams[0]).then((result)=>{
            setHomeStatistics(result.data.response[0].statistics)
        })
    },[fixture,teams])
    console.log('home_st',homeStatistics)
    return(
        <div>

        </div>
    )
}

export default Statistics