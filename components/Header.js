import { PageHeader, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useContext, useState } from "react";
import { PlayerContext } from "../pages/_app";
import { useRouter } from 'next/router'

export const Header = () => {
    const player = useContext(PlayerContext)
    const router = useRouter()

    let extra = [
        <Button key={1} type="link" onClick={() => {
            router.push('/')
        }}>На главную</Button>,
        
        <Button key={2} onClick={() => {
            router.push('/login')
        }}>Авторизация</Button>,

        <Button key={3} type="primary" onClick={() => {
            router.push('/registration')
        }}>Регистрация</Button>
    ]

    if(player) {
        extra = [
            <Button key={1} type="link" onClick={() => {
                router.push('/')
            }}>На главную</Button>,

            <Button key={2} onClick={() => {
                router.push('/profile')
            }}>{player.name}</Button>
        ]
    }

    return(
        <>
            <PageHeader
                className="site-page-header"
                title="Am League"
                subTitle="Футбол – это твой ритм жизни"
                extra={extra}
            >
            </PageHeader>
        </>
    )
}