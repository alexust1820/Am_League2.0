import React from "react";
import FutureMatchCSS from "./matchCard.module.css";
import teamAvatar from '../../media/teamAvatar.png';

export default function FutureMatchCard(elem) {
    const {match} = elem;
    const today = Date.now();
    const matchData = new Date(+match.startTime)
    const month = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 
        'Июль', 'Август','Сентябрь', 'Октабрь', 'Ноябрь', 'Декабрь'];

    function startTimeCheck() {
        return (today > matchData) ? true : false
    }

    if(!startTimeCheck()) {
        return(
            <div className={FutureMatchCSS.card}>
                <div className={FutureMatchCSS.team1}>
                    <img src={teamAvatar} className={FutureMatchCSS.avatar}/>
                    <p className={FutureMatchCSS.teamName}>{match.team1}</p>
                </div>
                <h4 className={FutureMatchCSS.time}>
                    {matchData.getDate()} {month[matchData.getMonth()]} - {matchData.getHours()}
                    :{matchData.getMinutes()}
                </h4>
                <div className={FutureMatchCSS.team2}>
                    <img src={teamAvatar} className={FutureMatchCSS.avatar}/>
                    <p className={FutureMatchCSS.teamName}>{match.team2}</p>
                </div>
            </div>
        );
    }
}