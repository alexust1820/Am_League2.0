import MainContainer from "../../components/MainContainer"
import ProfileCSS from './profile.module.css'
import axios from 'axios'
import { Typography } from "antd"

const Profile = ({player}) => {
    const metadata = {
        title: "Профиль",
        desc: "Am League - место встречи футбольных команд"
    }

    return(
        <MainContainer metadata={metadata}>
            <div className={ProfileCSS.content}>

                <Typography.Title level={4}>
                    Имя - {player.name}
                </Typography.Title>
                <Typography.Title level={4}>
                    Фамилия - {player.surname}
                </Typography.Title>
                <Typography.Title level={4}>
                    Email - {player.email}
                </Typography.Title>
                <Typography.Title level={4}>
                    Позиция - {player.position_id}
                </Typography.Title>
                
            </div>
        </MainContainer>
    )
}

export async function getServerSideProps({req, res}) {
    const token = req.cookies.token
    const url = "http://localhost:8080/user-params"
    let player = null

    if(token) {
        player = await axios({
        method: "post",
        url: url,
        headers: {
            Authorization: `Bearer ${token}`
        }
        }).then(async res => {
        return await res.data
        }).catch(err => {})
    }

    return {
      props: { player: player || '' }
    }
}

export default Profile