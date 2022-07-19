import React from "react"
import {useNavigate} from 'react-router-dom';
import { Header } from "../../components/Header"
import { Typography, Button } from "antd"
//import { green } from '@ant-design/colors'
import MainCSS from "./main.module.css"

export default function Main() {
    document.title = 'Am League'
    const nav = useNavigate()
    return(
        <>
            <Header/>
            <div className={MainCSS.hero}>
                <div className="container">
                    <div className={MainCSS.content}>
                        <Typography.Title 
                            style={{color: `#ffffff`}} 
                            level={1}
                            className={MainCSS.title}>
                                Am League - место встречи футбольных команд
                        </Typography.Title>
                        <div className={MainCSS.createTeamAndMatch}>
                            <Button 
                                type="primary"
                                onClick={() => nav('/create-team')} 
                                className={MainCSS.createTeam}>
                                    Создать команду
                            </Button>
                            <Button 
                                type="danger"
                                onClick={() => nav('/create-match')} 
                                className={MainCSS.createMatch}>
                                    Создать матч
                            </Button>    
                        </div>			
                    </div>
                </div>
            </div>
        </>
    )
}