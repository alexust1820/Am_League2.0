import { useContext, useState } from "react"
import { Button, Typography } from "antd"
import { Header } from "../../components/Header"
import ProfileCSS from "./profile.module.css"
import { UserContext } from "../../hoc/UserProvider"
import { PositionContext } from "../../hoc/PosiotionProvider"

export const Profile = () => {
    const userParams = useContext(UserContext)
    const positions = useContext(PositionContext)

    document.title = 'Профиль'

    return(
        <>
            <Header/>
            <div className="container">
                <div className={ProfileCSS.content}>
                    <Typography.Title 
                        level={3} 
                        style={{textAlign: "center"}}>
                        Профиль игрока
                    </Typography.Title>
                    
                    <div className={ProfileCSS.userBlock}>
                        <Typography.Title level={5}>
                            Имя - {userParams.name}
                        </Typography.Title>

                        <Typography.Title level={5}>
                            Фамилия - {userParams.surname}
                        </Typography.Title>

                        <Typography.Title level={5}>
                            Электронная почта - {userParams.email}
                        </Typography.Title>

                        <Typography.Title 
                            level={5} 
                            style={{marginBottom: "200px"}}>
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
                </div>
            </div>
        </>
    )
}