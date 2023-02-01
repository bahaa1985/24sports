import React,{ ReactDOM } from 'react'
import { useState,useEffect } from 'react'
import getStandings from '../api/getStandings'


function Standings(props){
const [standings,setStandings]=useState([])

    useEffect(()=>{
        if(props.leagueId>0){
            getStandings(props.leagueId,props.seasonId).then((response)=>{
                setStandings( response.data.response[0].league.standings[0] )                                          
            })       
            
        }
        
    },[props])

   
    return(
        <div>
            <table className='table table-hover'>
                <thead>
                    <tr>
                        <td>Rank</td>
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
                                <tr key={d.team.id}>
                                    <td>{d.rank}</td>
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
                        // }
                        
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Standings