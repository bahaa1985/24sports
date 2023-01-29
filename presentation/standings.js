import React,{ ReactDOM } from 'react'
import getStandings from '../api/getStandings'



function standings(){
    let standings=getStandings(39,2022)
    return(
        <div>
            <table className='table table-hover'>
                <thead>
                    <tr>
                        <td>Team</td>
                        <td>Games</td>
                        <td>Win</td>
                        <td>Draw</td>
                        <td>Loss</td>
                        <td>Dif</td>
                        <td>Points</td>
                    </tr>

                </thead>
            </table>
        </div>
    )
}
