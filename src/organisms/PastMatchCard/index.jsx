import React from "react";
import MatchCardCSS from '../FutureMatchCard/matchCard.module.css';
import teamAvatar from '../../media/teamAvatar.png';
import winCup from '../../media/winCup.png';

export default function PastMatchCard(elem) {
    const {match} = elem;
    const today = Date.now();
    const matchData = new Date(+match.startTime)

    function startTimeCheck() {
        return (today > matchData) ? true : false
    }

    if((match.team1Goals > match.team2Goals) & startTimeCheck()) {
        return(
            <div className={MatchCardCSS.card}>
                <div className={MatchCardCSS.team1}>
                    <img src={teamAvatar} className={MatchCardCSS.avatar}/>
                    <p className={MatchCardCSS.teamName}>{match.team1}</p>
                    <img src={winCup} className={MatchCardCSS.winCup1}/>
                </div>
                <h4 className={MatchCardCSS.goals}>{match.team1Goals} : {match.team2Goals}</h4>
                <div className={MatchCardCSS.team2}>
                    <img src={teamAvatar} className={MatchCardCSS.avatar}/>
                    <p className={MatchCardCSS.teamName}>{match.team2}</p>
                </div>
            </div>
        );
    } else if((match.team1Goals < match.team2Goals) & startTimeCheck()) {
        return(
            <div className={MatchCardCSS.card}>
                <div className={MatchCardCSS.team1}>
                    <img src={teamAvatar} className={MatchCardCSS.avatar}/>
                    <p className={MatchCardCSS.teamName}>{match.team1}</p>
                </div>
                <h4 className={MatchCardCSS.goals}>{match.team1Goals} : {match.team2Goals}</h4>
                <div className={MatchCardCSS.team2}>
                    <img src={teamAvatar} className={MatchCardCSS.avatar}/>
                    <p className={MatchCardCSS.teamName}>{match.team2}</p>
                    <img src={winCup} className={MatchCardCSS.winCup2}/>
                </div>
            </div>
        );
    } else if ((match.team1Goals === match.team2Goals) & startTimeCheck()) {
        return(
            <div className={MatchCardCSS.card}>
                <div className={MatchCardCSS.team1}>
                    <img src={teamAvatar} className={MatchCardCSS.avatar}/>
                    <p className={MatchCardCSS.teamName}>{match.team1}</p>
                </div>
                <h4 className={MatchCardCSS.goals}>{match.team1Goals} : {match.team2Goals}</h4>
                <div className={MatchCardCSS.team2}>
                    <img src={teamAvatar} className={MatchCardCSS.avatar}/>
                    <p className={MatchCardCSS.teamName}>{match.team2}</p>
                </div>
            </div>
        );
    }
}