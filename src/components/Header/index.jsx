import React, { useContext } from "react";
import {useNavigate} from 'react-router-dom';
import { PageHeader, Button, Typography } from "antd";
import {UserOutlined} from "@ant-design/icons";
import logo from "../../media/logo.png";
import { UserContext } from "../../hoc/UserProvider";



export const Header = () => {
    const nav = useNavigate()
    const userParams = useContext(UserContext)

    if (!userParams) {
        return(
            <>
                <PageHeader
                    className="site-page-header"
                    title="Am League"
                    subTitle="Футбол – это твой ритм жизни"
                    extra={[
                        <Button key={1} onClick={() => {
                            nav('/')
                        }} type="link" >На главную</Button>,
                        <Button key={2} onClick={() => {
                            nav('/login')
                        }} >Авторизация</Button>,
                        <Button key={3} onClick={() => {
                            nav('/registration')
                        }} type="primary">Регистрация</Button>
                    ]}
                    avatar={{
                        src: `${logo}`
                    }}
                >
                </PageHeader>
            </>
        )   
    } else {
        return(
            <>
                <PageHeader
                    className="site-page-header"
                    title="Am League"
                    subTitle="Футбол – это твой ритм жизни"
                    extra={[
                        <Button key={1} onClick={() => {
                            nav('/')
                        }} type="link" >На главную</Button>,
                        <Button key={2} type="second" onClick={() => {
                            nav('/profile')
                        }}>
                            <Typography.Text>
                                {userParams}
                            </Typography.Text>
                            <UserOutlined />
                        </Button>
                    ]}
                    avatar={{
                        src: `${logo}`
                    }}
                >
                </PageHeader>
            </>
        )
    }
}