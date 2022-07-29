import { useContext} from "react"
import { Button, Typography } from "antd"
import { Header } from "../../components/Header"
import ProfileCSS from "./profile.module.css"
import { UserContext } from "../../hoc/UserProvider"

export const Profile = () => {
    const userParams = useContext(UserContext)
    const positions = [
        'Не определен',
        'Вратать',
        'Защитник',
        'Полузащитник',
        'Нападающий'
    ]

    document.title = 'Профиль'

    return(
        <>
            <Header/>
            <div className="container">
                <div className={ProfileCSS.content}>
                    <div className={ProfileCSS.userBlock}>
                        <Typography.Title 
                            level={3}
                            className={ProfileCSS.title}>
                            Профиль игрока
                        </Typography.Title>

                        <Typography.Title 
                            level={5}>
                            Имя - {userParams.name}
                        </Typography.Title>

                        <Typography.Title 
                            level={5}>
                            Фамилия - {userParams.surname}
                        </Typography.Title>

                        <Typography.Title 
                            level={5}>
                            Электронная почта - {userParams.email}
                        </Typography.Title>

                        <Typography.Title 
                            level={5}>
                            Позиция на поле - {positions[(userParams.position_id - 1)]}
                        </Typography.Title>

                        <Button onClick={() =>{
                                localStorage.removeItem('jwt')
                                window.location.href = '/'
                            }} 
                            type="danger">
                            Выйти из аккаунта
                        </Button>
                    </div>

                    <div className={ProfileCSS.teamBlock}>
                        <Typography.Title 
                            level={3}
                            className={ProfileCSS.title}>
                                Блок команды
                        </Typography.Title>
                    </div>
                </div>
            </div>
        </>
    )
}