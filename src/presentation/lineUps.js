import React,{ ReactDOM } from 'react'
import { useState,useEffect } from 'react'
import getLinesUps from '../api/getLinesUps'

function LineUps(props){
    const home=props.teams[0];
    const away=props.teams[1];
    const fixtureId=props.fixture;
    const [homeLineUp,setHomeLineUp]=useState([]);
    const [awayLineUp,setAwayLineUp]=useState([]);

    useEffect(()=>{
        getLinesUps(fixtureId).then((result)=>{
            setHomeLineUp(result.data.response[0].startXI);
            setAwayLineUp(result.data.response[1].startXI);
        })
    },[fixtureId]);

    console.log('Home start:',homeLineUp);
    console.log('Away start:',awayLineUp);

    return(
        <div>
            <h1>Line ups</h1>
        </div>
    )
}

export default LineUps
