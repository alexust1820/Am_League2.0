import React from 'react';
import Header from '../organisms/Header';
import Footer from '../organisms/Footer';
import MainScreenCSS from './main.module.css';
import {Link} from 'react-router-dom';
import FutureMatchCard from '../organisms/FutureMatchCard'
import PastMatchCard from '../organisms/PastMatchCard';

const matches = [
    {
        id: 1,
        team1: 'Зенит',
        team2: 'Спартак',
        startTime: 164932478200,
        team1Goals: 3,
        team2Goals: 2
    },
    {
        id: 2,
        team1: 'Зенит',
        team2: 'Спартак',
        startTime: 165000960000,
        team1Goals: 1,
        team2Goals: 2
    },
    {
        id: 3,
        team1: 'Зенит',
        team2: 'Спартак',
        startTime: 1680860782000,
        team1Goals: 0,
        team2Goals: 0
    },
    {
        id: 4,
        team1: 'Зенит',
        team2: 'Спартак',
        startTime: 16808607820,
        team1Goals: 0,
        team2Goals: 0
    }
];

export default function MainScreen() {
    document.title = 'AM League';
    return(
        <>
            <Header/>
            <div className={MainScreenCSS.hero}>
                <Link to='/create-match' className={MainScreenCSS.createMatch}>Создать матч!</Link>
            </div>
            <div className='container'>
                <div className={MainScreenCSS.futureMatches}>
                    <h2 className={MainScreenCSS.matchesTitle}>⚽Будущие матчи🏆</h2>
                    <div className={MainScreenCSS.matchesContent}>
                        {
                            matches.map((elem, i) => {
                                return <FutureMatchCard key={i} match={elem} />
                            })
                        }
                    </div>
                </div>
                <div className={MainScreenCSS.pastMatches}>
                    <h2 className={MainScreenCSS.matchesTitle}>⚽Прошедшие матчи🏆</h2>
                    <div className={MainScreenCSS.matchesContent}>
                    {
                            matches.map((elem, i) => {
                                return <PastMatchCard key={i} match={elem} />
                            })
                        }
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
}