import React,{ ReactDOM } from 'react'
import { useState,useEffect } from 'react'
import getStandings from '../api/getStandings'


function Standings(props){
const [standings,setStandings]=useState([])

    useEffect(()=>{
    
        setStandings(getStandings(props.leagueId,props.seasonId).then((response)=>{
           return response.data.response[0].league.standings[0]                        
        // console.log(response.data.response[0].league.standings[0])
        })
        // .then(()=>{
        //     // console.log(standings)
        // })
        )
    },[props])

    return(
        <div>
            <table className='table table-hover'>
                <thead>
                    <tr>
                        <td>Team</td>
                        <td>Games</td>
                        <td>Win</td>
                        <td>Draw</td>
                        <td>Lose</td>
                        <td>GF</td>
                        <td>GA</td>
                        <td>Points</td>
                    </tr>
                </thead>
                <tbody>
                    {standings.map((d)=>{
                        return(
                            <tr>
                                <td>{d.team.name}</td>
                                <td>{d.all.played}</td>
                                <td>{d.all.win}</td>
                                <td>{d.all.draw}</td>
                                <td>{d.all.lose}</td>
                                <td>{d.all.goals.for}</td>
                                <td>{d.all.goals.against}</td>
                                <td>{d.points}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Standings