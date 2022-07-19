import { useContext } from "react"
import { Typography } from "antd"
import { Header } from "../../components/Header"
import ProfileCSS from "./profile.module.css"
import { UserContext } from "../../hoc/UserProvider"

export const Profile = () => {
    const userParams = useContext(UserContext)
    return(
        <>
            <Header/>
            <div className="container">
                <div className={ProfileCSS.content}>
                    <Typography.Title 
                        level={3} 
                        style={{textAlign: "center"}}
                    >
                        Профиль игрока
                    </Typography.Title>
                    <div>
                         Имя - {userParams}
                    </div>
                </div>
            </div>
        </>
    )
}