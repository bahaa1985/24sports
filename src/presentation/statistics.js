import React from "react";
import getStatistics from "../api/getStatistics";
import { useContext,useState } from "react";

function Statistics(props){
    const teams=props.teams
    const fixture=props.fixture
    const [homeStatistics,setHomeStatistics]=useState(0)
    const [awayStatistics,setAwayStatistics]=useState(0)
    useContext(()=>{
        getStatistics(fixture,teams[0]).then((result)=>{
            setHomeStatistics(result.response.statistics)
        })
    })
    console.log(homeStatistics)
    return(
        <div>

        </div>
    )
}

export default Statistics