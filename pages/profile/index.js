import MainContainer from "../../components/MainContainer"
import ProfileCSS from './profile.module.css'
import axios from 'axios'
import jsCookie from 'js-cookie'
import { Button, Typography } from "antd"
import { useRouter } from "next/router"

const Profile = ({player}) => {
    const router = useRouter()
    const metadata = {
        title: "Профиль",
        desc: "Am League - место встречи футбольных команд"
    }

    const positions = ['Не определен', 'Вратарь', 'Защитник', 'Полузащитник', 'Нападающий']

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
                    Позиция - {positions.map((position, i) => {
                        if (i === player.position_id) {
                            return position
                        }
                    })}
                </Typography.Title>
                <Button danger onClick={() => {
                    jsCookie.remove('token')
                    router.push('/')
                }}>Out</Button>
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