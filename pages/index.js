import { Typography } from 'antd'
import { useContext } from 'react'
import MainContainer from '../components/MainContainer'
import MainCSS from './main.module.css'
import { PlayerContext } from './_app'

const Index = () => {
    const metadata = {
        title: "Am League",
        desc: "Am League - место встречи футбольных команд"
    }

    const player = useContext(PlayerContext)
    
    return(
        <MainContainer metadata={metadata}>
            <div className={MainCSS.content}>
                <Typography.Title 
                    level={1} 
                    className={MainCSS.title}>
                    Am League - место встречи футбольных команд
                </Typography.Title>
            </div>
        </MainContainer>
    )
}

export default Index

