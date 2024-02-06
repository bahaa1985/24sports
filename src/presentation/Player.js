import React, { useEffect } from "react";
import getPlayerInfo from "../api/getPlayerInfo";

function Player(props){
    const playerId=props.playerId;
    const season=props.season;
    const [playerProfile,setPlayerProfile]=([]);
    const [playerStatistics,setPlayerStatistics]=([]);
    useEffect(()=>{
        getPlayerInfo(playerId,season).then((result)=>{
            setPlayerProfile(result.response[0].player);
            setPlayerStatistics(result.response[0].statistics);
        });
    })
    return(
        <div>
            <div className="profile">
                <p>
                    {
                        playerProfile.name
                    }
                </p>
            </div>
            <div className="statistics">

            </div>
        </div>
    )
}

export default Player;